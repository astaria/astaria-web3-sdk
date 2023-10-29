const module = (function() {
    const utils = __KLAYTN__.utils;

    var _tx_number = 1;

    function _request_rpc(network, method, params) {
        const request = _build_request(method, params);
        const headers = _rpc_headers();

        return fetch(network.rpc_url, {
            method: "POST", 
            headers: headers, 
            body: JSON.stringify(request)
        })
            .then((response) => {
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
        const request = {};
    
        request["jsonrpc"] = "2.0";
        request["method"]  = method;
        request["params"]  = params;
        request["id"]      = _tx_number;
    
        _tx_number += 1;
    
        return request;
    }
    
    function _rpc_headers() {
        const headers = {};
    
        headers["Content-Type"] = "application/json-rpc";
    
        return headers;
    }

    return {
        create: function(network) {
            return {
                get_balance: function(account, block="latest") {
                    return new Promise((resolve, reject) => {
                        const method = "klay_getBalance";
                        const params = [ account, block ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(utils.value_to_bignum(response["result"]));
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_transaction_count: function(account, block="latest") {
                    return new Promise((resolve, reject) => {
                        const method = "klay_getTransactionCount";
                        const params = [ account, block ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(response["result"]);
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                get_transaction_receipt: function(tx_hash) {
                    return new Promise((resolve, reject) => {
                        const method = "klay_getTransactionReceipt";
                        const params = [ tx_hash ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(response["result"]);
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                get_logs: function(filter) {
                    return new Promise((resolve, reject) => {
                        const method = "klay_getLogs";
                        const params = [ filter ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(response["result"]);
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                get_gas_price: function() {
                    return new Promise((resolve, reject) => {
                        const method = "klay_gasPrice";
                        const params = [];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(response["result"]);
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                estimate_gas: function(from, to, data, value) {
                    return new Promise((resolve, reject) => {
                        const method = "klay_estimateGas";
                        const params = [ { from: from, to: to, data: data, value: value } ];
        
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(utils.value_to_bignum(response["result"]));
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                call: function(to, data, block="latest") {
                    return new Promise((resolve, reject) => {
                        const method = "klay_call";
                        const params = [ { to: to, data: data }, block ];
        
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(response["result"]);
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                send_raw_transaction: function(transaction) {
                    return new Promise((resolve, reject) => {
                        const method = "klay_sendRawTransaction";
                        const params = [ transaction ];
        
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response); // Do not return response["result"]
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                request: function(method, params) {
                    return new Promise((resolve, reject) => {
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response); // Do not return response["result"]
                            }); 
                    });
                },

                get_chain_id: function() {
                    return network.chain_id;
                }
            }
        }
    }
})();

__MODULE__ = module;
