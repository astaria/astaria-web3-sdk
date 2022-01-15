var module = (function() {
    const auth = __BINANCE_SMART_CHAIN__.auth,
          api = __BINANCE_SMART_CHAIN__.api,
          utils = __BINANCE_SMART_CHAIN__.utils,
          serializer = include("./serializer.js");

    function _send_transaction(from, transaction, key) {
        return _prepare_transaction(from, transaction)
            .then(function(transaction) {
                var signature = _sign_transaction(transaction, key);
            
                transaction["v"] = utils.value_to_number(signature["v"]);
                transaction["r"] = utils.value_to_number(signature["r"]);
                transaction["s"] = utils.value_to_number(signature["s"]);

                transaction = serializer.serialize_transaction(transaction);

                return api.send_raw_transaction(transaction);
            });
    }

    function _prepare_transaction(from, transaction) {
        return api.get_transaction_count(from, "latest")
            .then(function(response) {
                transaction["chainId"] = __ETHEREUM__.net.chain_id;
                transaction["nonce"]   = utils.value_to_number(response);
            
                return Promise.resolve(transaction);
            });
    }

    function _sign_transaction(transaction, key) {
        var message = serializer.serialize_transaction(transaction, true);
        var signature = auth.sign_message(message, key);

        signature["v"] += transaction["chainId"] * 2 + 35;

        return signature;
    }
                  
    return {
        transfer: function(from, to, amount, fee, key) {
            return new Promise(function(resolve, reject) {
                var transaction = {};
        
                transaction["to"]       = utils.value_to_number(to);
                transaction["value"]    = utils.value_to_wei(amount, "ether");
                transaction["gasPrice"] = utils.value_to_wei(fee, "Gwei");
                transaction["gasLimit"] = utils.value_to_number(100000);
        
                _send_transaction(from, transaction, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        call: function(from, to, data, fee, key) {
            return new Promise(function(resolve, reject) {
                var transaction = {};
        
                transaction["to"]       = utils.value_to_number(to);
                transaction["data"]     = utils.value_to_number(data);
                transaction["gasPrice"] = utils.value_to_wei(fee, "Gwei");
                transaction["gasLimit"] = utils.value_to_number(100000);
        
                _send_transaction(from, transaction, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        send: function(transaction, key) {
            return new Promise(function(resolve, reject) {
                var { from } = transaction;

                _send_transaction(from, transaction, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
    }
})();

__MODULE__ = module;
