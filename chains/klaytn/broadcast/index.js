const module = (() => {
    const auth = __KLAYTN__.auth,
          utils = __KLAYTN__.utils,
          serializer = include("./serializer.js");

    function _send_transaction(api, from, transaction, createOnly, fee, gasPrice, key_or_offerer) {
        return _prepare_transaction(from, transaction)
            .then(([ transaction, balance ]) => {
                return _get_gas_price(gasPrice)
                    .then((gasPrice) => {
                        const value = utils.value_to_bignum(transaction["value"] || "");
                        const gas = utils.value_to_bignum(gasPrice).times(fee.times(3));
                        
                        if (balance.lt(value.plus(gas))) {
                            return Promise.reject({ "reason": "insufficient-funds" });
                        }

                        return gasPrice;
                    })
                    .then((gasPrice) => {
                        if (key_or_offerer instanceof Function) {
                            return key_or_offerer({
                                type: "transaction",
                                transaction: transaction, 
                                fee: fee, 
                                gasPrice: gasPrice
                            });
                        }
                        
                        return Promise.resolve([ key_or_offerer, gasPrice ]);
                    })
                    .then(([ key, gasPrice ]) => {
                        console.log("gasPrice: " + gasPrice)
                        transaction = Object.assign(transaction, {
                            "gasPrice": gasPrice,
                            "gas": fee.times(3)
                        });

                        return Promise.resolve([ transaction, key ]);
                    });
            })
            .then(([ transaction, key ]) => {
                const signature = _sign_transaction(transaction, key);

                if (transaction["type"] && transaction["type"] !== "LEGACY") {
                    transaction["signatures"] = [
                        [
                            signature["v"],
                            signature["r"],
                            signature["s"]
                        ]
                    ];
                } else {
                    transaction["v"] = signature["v"];
                    transaction["r"] = signature["r"];
                    transaction["s"] = signature["s"];
                }

                transaction = serializer.serialize_transaction(transaction);

                if (createOnly) {
                    return Promise.resolve(transaction);
                }

                return api.send_raw_transaction(transaction);
            });
    }

    function _prepare_transaction(from, transaction) {
        return Promise.all([
            api.get_transaction_count(from),
            api.get_balance(from)
        ])
            .then(([ count, balance ]) => {
                transaction["chainId"] = api.get_chain_id();
                transaction["nonce"]   = utils.value_to_bignum(count);

                return Promise.resolve([ transaction, balance ]);
            });
    }

    function _sign_transaction(transaction, key) {
        const message = serializer.serialize_transaction(transaction, true);
        const signature = auth.sign_message(message, key);

        signature["v"] += transaction["chainId"] * 2 + 35; // EIP-155

        return signature;
    }

    function _request_sign(message, account, password, key) {
        return Promise.resolve()
            .then(() => {
                if (key_or_offerer instanceof Function) {
                    return key_or_offerer({
                        type: "sign",
                        message: message, 
                        account: account,
                        password: password
                    });
                }
                
                return key_or_offerer;
            })
            .then((key) => {
                return _sign_message(message, password, key);
            });
    }

    function _sign_message(message, password, key) {
        const prefix = "\x19Klaytn Signed Message:\n" + message.length;
        const signature = auth.sign_message(prefix + message, key);
        const r = signature["r"].replace(/^0x/, "");
        const s = signature["s"].replace(/^0x/, "");
        const v = ("0" + signature["v"].toString(16)).slice(-2);

        return "0x" + r + s + v;
    }
    
    function _get_gas_price(gasPrice) {
        if (!gasPrice) {
            return api.get_gas_price();
        }

        return Promise.resolve(gasPrice);
    }

    return {
        create: (api) => {
            var _key_offeror;

            return {
                transfer: (from, to, value, gasPrice, key) => {
                    return new Promise((resolve, reject) => {
                        const transaction = {
                            "type": "VALUE_TRANSFER",
                            "from": from,
                            "to": to,
                            "value": value = utils.value_to_hex(value)
                        };
        
                        api.estimate_gas(from, to, "", value)
                            .then((fee) => {
                                return _send_transaction(from, transaction, false, fee, gasPrice, key || _key_offeror)
                            })
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                call: (from, to, data, value, gasPrice, key) => {
                    return new Promise((resolve, reject) => {
                        const transaction = {
                            "type": "SMART_CONTRACT_EXECUTION",
                            "from": from,
                            "to": to,
                            "data": data,
                            "value": value = utils.value_to_hex(value)
                        };
        
                        api.estimate_gas(from, to, data, value)
                            .then((fee) => {
                                return _send_transaction(api, from, transaction, false, fee, gasPrice, key || _key_offeror)
                            })
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                create: (from, to, data, value, gasPrice, key) => {
                    return new Promise((resolve, reject) => {
                        const transaction = {
                            "type": "SMART_CONTRACT_EXECUTION",
                            "from": from,
                            "to": to,
                            "data": data,
                            "value": value = utils.value_to_hex(value)
                        };
        
                        api.estimate_gas(from, to, data, value)
                            .then((fee) => {
                                return _send_transaction(from, transaction, true, fee, gasPrice, key || _key_offeror)
                            })
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                send: (transaction, gasPrice, key) => {
                    return new Promise((resolve, reject) => {
                        const { from, to, data, value } = transaction;
        
                        api.estimate_gas(from, to, data, value)
                            .then((fee) => {
                                return _send_transaction(from, transaction, false, fee, gasPrice, key || _key_offeror)
                            })
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                sign: (message, account, password, key) => {
                    return new Promise((resolve, reject) => {
                        _request_sign(message, account, password, key || _key_offeror)
                            .then((signature) => {
                                resolve(signature);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                set_key_offeror: (offeror) => {
                    _key_offeror = offeror;
                },
            }
        }
    }
})();

__MODULE__ = module;
