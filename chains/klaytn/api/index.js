const module = (() => {
    const utils = __KLAYTN__.utils;

    var _tx_number = 1;

    function _request_rpc(network, method, params) {
        var request = _build_request(method, params);
        var headers = _rpc_headers();

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
        create: (network) => {
            return {
                get_balance: (account, block="latest") => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_getBalance";
                        var params = [ account, block ];
                
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
                
                get_transaction_count: (account, block="latest") => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_getTransactionCount";
                        var params = [ account, block ];
                
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
        
                get_transaction_receipt: (tx_hash) => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_getTransactionReceipt";
                        var params = [ tx_hash ];
                
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
        
                get_logs: (filter) => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_getLogs";
                        var params = [ filter ];
                
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
        
                get_gas_price: () => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_gasPrice";
                        var params = [];
                
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
        
                estimate_gas: (from, to, data, value) => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_estimateGas";
                        var params = [ { from: from, to: to, data: data, value: value } ];
        
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
                
                call: (to, data, block="latest") => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_call";
                        var params = [ { to: to, data: data }, block ];
        
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
        
                send_raw_transaction: (transaction) => {
                    return new Promise((resolve, reject) => {
                        var method = "klay_sendRawTransaction";
                        var params = [ transaction ];
        
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response); // Do not return response["result"]
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                request: (method, params) => {
                    return new Promise((resolve, reject) => {
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response); // Do not return response["result"]
                            }); 
                    });
                },

                get_chain_id: () => {
                    return network.chain_id;
                }
            }
        }
    }
})();

__MODULE__ = module;
