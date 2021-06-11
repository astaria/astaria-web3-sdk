var module = (function() {
    const net = __KLAYTN__.net, 
          utils = __KLAYTN__.utils;

    var _tx_number = 1;

    function _request_rpc(method, params) {
        return new Promise(function(resolve, reject) {
            var request = _build_request(method, params);
            var headers = _rpc_headers();
    
            fetch(net.rpc_url, {
                method: "POST", 
                header: headers, 
                body: JSON.stringify(request)
            })
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(error) {
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
        get_balance: function(address, block) {
            return new Promise(function(resolve, reject) {
                var method = "eth_getBalance";
                var params = [ address, block ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            var wei = utils.value_to_number(response["result"]);
        
                            resolve(utils.wei_to_number(wei, "ether"));
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_transaction_count: function(address, block) {
            return new Promise(function(resolve, reject) {
                var method = "eth_getTransactionCount";
                var params = [ address, block ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            resolve(response["result"]);
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_gas_price: function() {
            return new Promise(function(resolve, reject) {
                var method = "eth_gasPrice";
                var params = [];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            resolve(response["result"]);
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        send_raw_transaction: function(transaction) {
            return new Promise(function(resolve, reject) {
                var method = "eth_sendRawTransaction";
                var params = [ transaction ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            resolve(response["result"]);
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        call: function(object, block) {
            return new Promise(function(resolve, reject) {
                var method = "eth_call";
                var params = [ object, block ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            resolve(response["result"]);
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },            
    }
})();

__MODULE__ = module;
