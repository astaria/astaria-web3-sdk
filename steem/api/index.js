var module = (function() {
    var _tx_number = 1;

    function _request_rpc(method, params) {
        return new Promise(function(resolve, reject) {
            var request = _build_request(method, params);
            var url = Steem.net.rpc_url;
            var headers = _rpc_headers();
    
            fetch(url, {
                method: "POST", 
                header: headers, 
                body: JSON.stringify(request)
            })
                .then(function(response) {
                    response.json()
                        .then(function(data) {
                            if (data["result"]) {
                                resolve(data["result"]);
                            } else {
                                reject(data["error"]);
                            }
                        }, function(error) {
                            reject(error);
                        });
                }, function(error) {
                    reject(error);
                });
        });
    }
    
    function _build_request(method, params) {
        var request = {};
    
        request["jsonrpc"] = "2.0";
        request["method"]  = method;
        request["params"]  = params;
        request["id"]      = _tx_number;
    
        _tx_number += 1;
    
        return request;
    }
    
    function _rpc_headers() {
        var headers = {};
    
        headers["Content-Type"] = "application/json-rpc";
    
        return headers;
    }
        
    return {
        get_dynamic_global_properties: function() {
            return new Promise(function(resolve, reject) {
                var method = "get_dynamic_global_properties";
                var params = [];
        
                _request_rpc(method, params)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
            });
        },
        
        get_block: function(block) {
            return new Promise(function(resolve, reject) {
                var method = "get_block";
                var params = [ block ];
        
                _request_rpc(method, params)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
            });
        },
        
        get_accounts: function(names) {
            return new Promise(function(resolve, reject) {
                var method = "get_accounts";
                var params = [ names ];
        
                _request_rpc(method, params)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
            });
        }, 
        
        get_follow_count: function(account) {
            return new Promise(function(resolve, reject) {
                var method = "call";
                var params = [ "follow_api", "get_follow_count", [ account ] ];
        
                _request_rpc(method, params)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
            });
        }, 
        
        broadcast_transaction_synchronous: function(transaction) {
            return new Promise(function(resolve, reject) {
                var method = "broadcast_transaction_synchronous";
                var params = [ transaction ];
        
                _request_rpc(method, params)
                    .then(function(result) {
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
            });
        },        
    }
})();

__MODULE__ = module;
