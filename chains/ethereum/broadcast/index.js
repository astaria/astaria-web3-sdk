var module = (function() {
    const auth = __ETHEREUM__.auth,
          utils = __ETHEREUM__.utils,
          serializer = include("./serializer.js");

    function _send_transaction(api, from, transaction, createOnly, fee, gasPrice, key_or_offerer) {
        return _prepare_transaction(api, from, transaction)
            .then(function([ transaction, balance ]) {
                return _get_gas_price(gasPrice)
                    .then(function(gasPrice) {
                        var value = utils.value_to_bignum(transaction["value"] || "");
                        var gas = utils.value_to_bignum(gasPrice).times(fee.times(3));
                        
                        if (balance.lt(value.plus(gas))) {
                            return Promise.reject({ "reason": "insufficient-funds" });
                        }

                        return gasPrice;
                    })
                    .then(function(gasPrice) {
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
                    .then(function([ key, gasPrice ]) {
                        transaction = Object.assign(transaction, {
                            "gasPrice": gasPrice,
                            "gas": fee.times(3)
                        });
                        
                        return Promise.resolve([ transaction, key ]);
                    })
            })
            .then(function([ transaction, key ]) {
                var signature = _sign_transaction(transaction, key);
            
                transaction["v"] = signature["v"];
                transaction["r"] = signature["r"];
                transaction["s"] = signature["s"];

                transaction = serializer.serialize_transaction(transaction);

                if (createOnly) {
                    return Promise.resolve(transaction);
                }

                return api.send_raw_transaction(transaction);
            });
    }

    function _prepare_transaction(api, from, transaction) {
        return Promise.all([
            api.get_transaction_count(from),
            api.get_balance(from)
        ])
            .then(function([ count, balance ]) {
                transaction["chainId"] = api.get_chain_id();
                transaction["nonce"]   = utils.value_to_bignum(count);

                return Promise.resolve([ transaction, balance ]);
            });
    }

    function _sign_transaction(transaction, key) {
        var message = serializer.serialize_transaction(transaction, true);
        var signature = auth.sign_message(message, key);

        signature["v"] += transaction["chainId"] * 2 + 35; // EIP-155

        return signature;
    }

    function _request_sign(message, account, password, key_or_offerer) {
        return Promise.resolve()
            .then(function() {
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
            .then(function(key) {
                return _sign_message(message, password, key);
            });
    }

    function _sign_message(message, password, key) {
        var prefix = "\x19Ethereum Signed Message:\n" + message.length;
        var signature = auth.sign_message(prefix + message, key);
        var r = signature["r"].replace(/^0x/, "");
        var s = signature["s"].replace(/^0x/, "");
        var v = ("0" + signature["v"].toString(16)).slice(-2);

        return "0x" + r + s + v;
    }

    function _get_gas_price(gasPrice) {
        if (!gasPrice) {
            return api.get_gas_price();
        }

        return Promise.resolve(gasPrice);
    }

    return {
        create: function(network, api) {
            var _key_offeror;

            return {
                transfer: function(from, to, value, gasPrice, key) {
                    return new Promise(function(resolve, reject) {
                        var transaction = {
                            "from": from,
                            "to": to,
                            "value": value = utils.value_to_hex(value)
                        };
        
                        api.estimate_gas(from, to, "", value)
                            .then(function(fee) {
                                return _send_transaction(api, from, transaction, false, fee, gasPrice, key || _key_offeror)
                            })
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
        
                call: function(from, to, data, value, gasPrice, key) {
                    return new Promise(function(resolve, reject) {
                        var transaction = {
                            "from": from,
                            "to": to,
                            "data": data,
                            "value": value = utils.value_to_hex(value)
                        };
        
                        api.estimate_gas(from, to, data, value)
                            .then(function(fee) {
                                return _send_transaction(api, from, transaction, false, fee, gasPrice, key || _key_offeror)
                            })
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
        
                create: function(from, to, data, value, gasPrice, key) {
                    return new Promise(function(resolve, reject) {
                        var transaction = {
                            "from": from,
                            "to": to,
                            "data": data,
                            "value": value = utils.value_to_hex(value)
                        };
        
                        api.estimate_gas(from, to, data, value)
                            .then(function(fee) {
                                return _send_transaction(api, from, transaction, true, fee, gasPrice, key || _key_offeror)
                            })
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
        
                send: function(transaction, gasPrice, key) {
                    return new Promise(function(resolve, reject) {
                        var { from, to, data, value } = transaction;
        
                        api.estimate_gas(from, to, data, value)
                            .then(function(fee) {
                                return _send_transaction(api, from, transaction, false, fee, gasPrice, key || _key_offeror)
                            })
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
        
                sign: function(message, account, password, key) {
                    return new Promise(function(resolve, reject) {
                        _request_sign(message, account, password, key || _key_offeror)
                            .then(function(signature) {
                                resolve(signature);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
        
                set_key_offeror: function(offeror) {
                    _key_offeror = offeror;
                },
            }
        }
    }
})();

__MODULE__ = module;
