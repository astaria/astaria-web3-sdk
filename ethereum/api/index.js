EthereumAPI = (function() {
    return {
        _tx_number:1
    };
})();

EthereumAPI.get_balance = function(address, block) {
    return new Promise(function(resolve, reject) {
        var method = "eth_getBalance";
        var params = [ address, block ];

        EthereumAPI.__request_rpc(method, params).then(function(response) {
            if (!response["result"]) {
                reject(response["error"]);

                return;
            }
            var wei = EthereumUtils.value_to_number(response["result"]);

            resolve(EthereumUtils.wei_to_number(wei, "ether"));
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumAPI.get_transaction_count = function(address, block) {
    return new Promise(function(resolve, reject) {
        var method = "eth_getTransactionCount";
        var params = [ address, block ];

        EthereumAPI.__request_rpc(method, params).then(function(response) {
            if (!response["result"]) {
                reject(response["error"]);

                return;
            }

            resolve(response["result"]);
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumAPI.get_gas_price = function(address, block) {
    return new Promise(function(resolve, reject) {
        var method = "eth_gasPrice";
        var params = [];

        EthereumAPI.__request_rpc(method, params).then(function(response) {
            if (!response["result"]) {
                reject(response["error"]);

                return;
            }

            resolve(response["result"]);
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumAPI.send_raw_transaction = function(transaction) {
    return new Promise(function(resolve, reject) {
        var method = "eth_sendRawTransaction";
        var params = [ transaction ];

        EthereumAPI.__request_rpc(method, params).then(function(response) {
            if (!response["result"]) {
                reject(response["error"]);

                return;
            }

            resolve(response["result"]);
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumAPI.call = function(object, block) {
    return new Promise(function(resolve, reject) {
        var method = "eth_call";
        var params = [ object, block ];

        EthereumAPI.__request_rpc(method, params).then(function(response) {
            if (!response["result"]) {
                reject(response["error"]);

                return;
            }

            resolve(response["result"]);
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumAPI.__request_rpc = function(method, params) {
    return new Promise(function(resolve, reject) {
        var request = EthereumAPI.__build_request(method, params);
        var url = "https://ropsten.infura.io";
        var headers = EthereumAPI.__rpc_headers();

        fetch(url, {
            method:"POST", header:headers, body:JSON.stringify(request)
        }).then(function(response) {
            response.json().then(function(json) {
                console.log(JSON.stringify(json));
                resolve(json);
            }, function(reason) {
                reject(reason);
            });
        }, function(reason) {
            reject(reason);
        });
    });
}

EthereumAPI.__build_request = function(method, params) {
    var request = {};

    request["jsonrpc"] = "2.0";
    request["method"]  = method;
    request["params"]  = params;
    request["id"]      = EthereumAPI._tx_number;

    EthereumAPI._tx_number += 1;

    return request;
}

EthereumAPI.__rpc_headers = function() {
    var headers = {};

    headers["Content-Type"] = "application/json-rpc";

    return headers;
}

__MODULE__ = EthereumAPI;