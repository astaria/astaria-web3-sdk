var module = (function() {
    const auth       = Ethereum.auth,
          api        = Ethereum.api,
          utils      = Ethereum.utils,
          serializer = include("./serializer.js");

    function _send_transaction(from, transaction, key) {
        return new Promise(function(resolve, reject) {
            _prepare_transaction(from, transaction)
                .then(function(transaction) {
                    _sign_transaction(transaction, key)
                        .then(function(signature) {
                            transaction["v"] = utils.value_to_number(signature["v"]);
                            transaction["r"] = utils.value_to_number(signature["r"]);
                            transaction["s"] = utils.value_to_number(signature["s"]);
    
                            transaction = serializer.serialize_transaction(transaction, "hex");
    
                            api.send_raw_transaction(transaction)
                                .then(function(result) {
                                    resolve(result);
                                }, function(error) {
                                    reject(error);
                                });
                        }, function(error) {
                            reject(error);
                        });
                }, function(error) {
                    reject(error);
                });
        });
    }
    
    function _prepare_transaction(from, transaction) {
        return new Promise(function(resolve, reject) {
            api.get_transaction_count(from, "latest")
                .then(function(response) {
                    transaction["chainId"] = Ethereum.net.chain_id;
                    transaction["nonce"] = utils.value_to_number(response);
                    transaction["v"] = utils.value_to_number(transaction["chainId"]);
                    transaction["r"] = utils.value_to_number(0);
                    transaction["s"] = utils.value_to_number(0);
    
                    resolve(transaction);
                }, function(error) {
                    reject(error)
                });
        });
    }
    
    function _sign_transaction(transaction, key) {
        return new Promise(function(resolve, reject) {
            var message = serializer.serialize_transaction(transaction);
            var signature = auth.sign_message(message, key);
    
            signature["v"] += transaction["chainId"] * 2 + 35;
    
            resolve(signature);
        });
    }
    
    return {
        transfer: function(from, to, amount, fee, key) {
            return new Promise(function(resolve, reject) {
                var transaction = {};
        
                transaction["to"] = utils.value_to_number(to);
                transaction["value"] = utils.value_to_wei(amount, "ether");
                transaction["gasPrice"] = utils.value_to_wei(fee, "Gwei");
                transaction["gasLimit"] = utils.value_to_number(100000);
        
                _send_transaction(from, transaction, key)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error)
                    });
            });
        },
        
        call: function(from, to, data, fee, key) {
            return new Promise(function(resolve, reject) {
                var transaction = {};
        
                transaction["to"] = utils.value_to_number(to);
                transaction["data"] = utils.value_to_number(data);
                transaction["gasPrice"] = utils.value_to_wei(fee, "Gwei");
                transaction["gasLimit"] = utils.value_to_number(100000);
        
                _send_transaction(from, transaction, key)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error)
                    });
            });
        },
    }
})();

__MODULE__ = module;
