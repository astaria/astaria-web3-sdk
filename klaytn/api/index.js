var module = (function() {
    const utils = __KLAYTN__.utils;

    var _tx_number = 1;

    function _request_rpc(method, params) {
        var request = _build_request(method, params);
        var headers = _rpc_headers();

        return fetch(__KLAYTN__.net.rpc_url, {
            method: "POST", 
            headers: headers, 
            body: JSON.stringify(request)
        })
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ 
                        status: response.status,
                        message: response.statusText
                    });
                }
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
        get_balance: function(account, block="latest") {
            return new Promise(function(resolve, reject) {
                var method = "klay_getBalance";
                var params = [ account, block ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            resolve(utils.value_to_number(response["result"]));
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_transaction_count: function(account, block="latest") {
            return new Promise(function(resolve, reject) {
                var method = "klay_getTransactionCount";
                var params = [ account, block ];
        
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

        get_transaction_receipt: function(tx_hash) {
            return new Promise(function(resolve, reject) {
                var method = "klay_getTransactionReceipt";
                var params = [ tx_hash ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            console.log("receipt: " + JSON.stringify(response["result"]))
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
                var method = "klay_gasPrice";
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
        
        call: function(to, data, block="latest") {
            return new Promise(function(resolve, reject) {
                var method = "klay_call";
                var params = [ { to: to, data: data }, block ];
        
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
                var method = "klay_sendRawTransaction";
                var params = [ transaction ];

                console.log("transaction: " + transaction);
                _request_rpc(method, params)
                    .then(function(response) {
                        console.log("responce: " + JSON.stringify(response));
                        resolve(response); // Do not return response["result"]
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        request: function(method, params) {
            console.log(JSON.stringify([method, params]))
            return new Promise(function(resolve, reject) {
                _request_rpc(method, params)
                    .then(function(response) {
                        console.log(JSON.stringify(response))
                        resolve(response); // Do not return response["result"]
                    }); 
            });
        },
    }
})();

__MODULE__ = module;
