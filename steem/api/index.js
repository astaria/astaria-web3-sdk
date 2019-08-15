SteemAPI = (function() {
    return {
        _tx_number:1
    };
})();

SteemAPI.get_dynamic_global_properties = function() {
    return new Promise(function(resolve, reject) {
        var method = "get_dynamic_global_properties";
        var params = [];

        SteemAPI.__request_rpc(method, params).then(function(response) {
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

SteemAPI.get_block = function(block) {
    return new Promise(function(resolve, reject) {
        var method = "get_block";
        var params = [ block ];

        SteemAPI.__request_rpc(method, params).then(function(response) {
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

SteemAPI.get_accounts = function(names) {
    return new Promise(function(resolve, reject) {
        var method = "get_accounts";
        var params = [ names ];

        SteemAPI.__request_rpc(method, params).then(function(response) {
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

SteemAPI.get_follow_count = function(account) {
    return new Promise(function(resolve, reject) {
        var method = "call";
        var params = [ "follow_api", "get_follow_count", [ account ] ];

        SteemAPI.__request_rpc(method, params).then(function(response) {
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

SteemAPI.broadcast_transaction_synchronous = function(transaction) {
    return new Promise(function(resolve, reject) {
        var method = "broadcast_transaction_synchronous";
        var params = [ transaction ];

        SteemAPI.__request_rpc(method, params).then(function(response) {
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

SteemAPI.__request_rpc = function(method, params) {
    return new Promise(function(resolve, reject) {
        var request = SteemAPI.__build_request(method, params);
        var url = "https://api.steemit.com";
        var headers = SteemAPI.__rpc_headers();

        fetch(url, {
            method:"POST", header:headers, body:JSON.stringify(request)
        }).then(function(response) {
            response.json().then(function(data) {
                resolve(data);
            }, function(reason) {
                reject(reason);
            });
        }, function(reason) {
            reject(reason);
        });
    });
}

SteemAPI.__build_request = function(method, params) {
    var request = {};

    request["jsonrpc"] = "2.0";
    request["method"]  = method;
    request["params"]  = params;
    request["id"]      = SteemAPI._tx_number;

    SteemAPI._tx_number += 1;

    return request;
}

SteemAPI.__rpc_headers = function() {
    var headers = {};

    headers["Content-Type"] = "application/json-rpc";

    return headers;
}

__MODULE__ = SteemAPI;
