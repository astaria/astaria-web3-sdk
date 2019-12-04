EthereumBroadcast = (function() {
    return {};
})();

EthereumBroadcast.serializer = include("./serializer.js")

EthereumBroadcast.transfer = function(from, to, amount, fee, key) {
    return new Promise(function(resolve, reject) {
        var transaction = {};

        transaction["to"] = EthereumUtils.value_to_number(to);
        transaction["value"] = EthereumUtils.value_to_wei(amount, "ether");
        transaction["gasPrice"] = EthereumUtils.value_to_wei(fee, "Gwei");
        transaction["gasLimit"] = EthereumUtils.value_to_number(100000);

        EthereumBroadcast.__send_transaction(from, transaction, key).then(function(response) {
            resolve(response);
        }, function(reason) {
            reject(reason)
        });
    });
}

EthereumBroadcast.call = function(from, to, data, fee, key) {
    return new Promise(function(resolve, reject) {
        var transaction = {};

        transaction["to"] = EthereumUtils.value_to_number(to);
        transaction["data"] = EthereumUtils.value_to_number(data);
        transaction["gasPrice"] = EthereumUtils.value_to_wei(fee, "Gwei");
        transaction["gasLimit"] = EthereumUtils.value_to_number(100000);

        EthereumBroadcast.__send_transaction(from, transaction, key).then(function(response) {
            resolve(response);
        }, function(reason) {
            reject(reason)
        });
    });
}

EthereumBroadcast.__send_transaction = function(from, transaction, key) {
    return new Promise(function(resolve, reject) {
        EthereumBroadcast.__prepare_transaction(from, transaction).then(function(transaction) {
            EthereumBroadcast.__sign_transaction(transaction, key).then(function(signature) {
                transaction["v"] = EthereumUtils.value_to_number(signature["v"]);
                transaction["r"] = EthereumUtils.value_to_number(signature["r"]);
                transaction["s"] = EthereumUtils.value_to_number(signature["s"]);

                transaction = EthereumBroadcast.serializer.serialize_transaction(transaction, "hex");

                Ethereum.api.send_raw_transaction(transaction).then(function(response) {
                    console.log("response: " + JSON.stringify(response));
                    resolve(response);
                }, function(reason) {
                    reject(reason);
                })
            });
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumBroadcast.__prepare_transaction = function(from, transaction) {
    return new Promise(function(resolve, reject) {
        Ethereum.api.get_transaction_count(from, "latest").then(function(response) {
            transaction["chainId"] = Ethereum.net.chain_id;
            transaction["nonce"] = EthereumUtils.value_to_number(response);
            transaction["v"] = EthereumUtils.value_to_number(transaction["chainId"]);
            transaction["r"] = EthereumUtils.value_to_number(0);
            transaction["s"] = EthereumUtils.value_to_number(0);

            resolve(transaction);
        }, function(reason) {
            reject(reason)
        });
    });
}

EthereumBroadcast.__sign_transaction = function(transaction, key) {
    return new Promise(function(resolve, reject) {
        var message = EthereumBroadcast.serializer.serialize_transaction(transaction);
        var signature = EthereumAuth.sign_message(message, key);

        signature["v"] += transaction["chainId"] * 2 + 35;

        resolve(signature);
    });
}

__MODULE__ = EthereumBroadcast;
