var module = (function () {
    const auth = __KLAYTN__.auth,
        api = __KLAYTN__.api,
        utils = __KLAYTN__.utils,
        serializer = include("./serializer.js");

    var _key_offeror;

    function _send_transaction(from, transaction, key) {
        return _prepare_transaction(from, transaction)
            .then(function (transaction) {
                if (!key && _key_offeror) {
                    return _key_offeror(transaction)
                        .then(function (key) {
                            return Promise.resolve([transaction, key]);
                        });
                }

                return Promise.resolve([ transaction, key ]);
            })
            .then(function ([ transaction, key ]) {
                var signature = _sign_transaction(transaction, key);

                if (transaction["type"] !== "LEGACY") {
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

                return api.send_raw_transaction(transaction);
            });
    }

    function _prepare_transaction(from, transaction) {
        return api.get_transaction_count(from, "latest")
            .then(function (count) {
                transaction["chainId"] = __KLAYTN__.net.chain_id;
                transaction["nonce"]   = utils.value_to_number(count);

                return Promise.resolve(transaction);
            });
    }

    function _sign_transaction(transaction, key) {
        var message = serializer.serialize_transaction(transaction, true);
        var signature = auth.sign_message(message, key);

        signature["v"] += transaction["chainId"] * 2 + 35; // EIP-155

        return signature;
    }

    return {
        transfer: function (from, to, value, key) {
            return new Promise(function (resolve, reject) {
                var transaction = {
                    "type": "VALUE_TRANSFER",
                    "from": from,
                    "to": to,
                    "value": value,
                    "gasPrice": parseInt("25000000000"),
                    "gas": parseInt("20000000")
                };

                _send_transaction(from, transaction, key)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },

        call: function (from, to, data, value, key) {
            return new Promise(function (resolve, reject) {
                var transaction = {
                    "type": "SMART_CONTRACT_EXECUTION",
                    "from": from,
                    "to": to,
                    "data": data,
                    "value": value,
                    "gasPrice": parseInt("25000000000"),
                    "gas": parseInt("20000000")
                };

                console.log(JSON.stringify(transaction));

                _send_transaction(from, transaction, key)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },

        send: function (transaction, key) {
            return new Promise(function (resolve, reject) {
                var { from } = transaction;

                _send_transaction(from, transaction, key)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },

        set_key_offeror: function (offeror) {
            _key_offeror = offeror;
        },
    }
})();

__MODULE__ = module;
