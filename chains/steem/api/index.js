const module = (function() {
    var _tx_number = 1;

    function _request_rpc(network, method, params) {
        const request = _build_request(method, params);
        const headers = _rpc_headers();
    
        fetch(network.rpc_url, {
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
                get_dynamic_global_properties: function() {
                    return new Promise((resolve, reject) => {
                        const method = "get_dynamic_global_properties";
                        const params = [];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_created: function(tag, start_author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_created";
                        const params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_trending: function(tag, start_author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_trending";
                        const params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_hot: function(tag, start_author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_hot";
                        const params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_feed: function(tag, start_author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_feed";
                        const params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_blog: function(tag, start_author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_blog";
                        const params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_comments: function(tag, start_author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_comments";
                        const params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_discussions_by_author_before_date: function(author, start_permlink, before_date, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_discussions_by_author_before_date";
                        const params = [ author, start_permlink, before_date.toISOString().substring(0, 19), limit ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_replies_by_last_update: function(author, start_permlink, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_replies_by_last_update";
                        const params = [ author, start_permlink, limit ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_content: function(author, permlink) {
                    return new Promise((resolve, reject) => {
                        const method = "get_content";
                        const params = [ author, permlink ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_content_replies: function(author, permlink) {
                    return new Promise((resolve, reject) => {
                        const method = "get_content_replies";
                        const params = [ author, permlink ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_active_votes: function(author, permlink) {
                    return new Promise((resolve, reject) => {
                        const method = "get_active_votes";
                        const params = [ author, permlink ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_accounts: function(names) {
                    return new Promise((resolve, reject) => {
                        const method = "get_accounts";
                        const params = [ names ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_account_history: function(account, from, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "get_account_history";
                        const params = [ account, from, limit ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_followers: function(following, start_follower, follow_type, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "call";
                        const params = [ "follow_api", "get_followers", [ following, start_follower, follow_type, limit ] ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_following: function(follower, start_following, follow_type, limit) {
                    return new Promise((resolve, reject) => {
                        const method = "call";
                        const params = [ "follow_api", "get_following", [ follower, start_following, follow_type, limit ] ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_follow_count: function(account) {
                    return new Promise((resolve, reject) => {
                        const method = "call";
                        const params = [ "follow_api", "get_follow_count", [ account ] ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_state: function(path) {
                    return new Promise((resolve, reject) => {
                        const method = "call";
                        const params = [ "database_api", "get_state", [ path ] ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                resolve(response["result"]);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
                
                get_block: function(block) {
                    return new Promise((resolve, reject) => {
                        const method = "get_block";
                        const params = [ block ];
                
                        _request_rpc(network, method, params)
                            .then((response) => {
                                if (response["result"]) {
                                    resolve(response["result"]);
                                } else {
                                    reject(response["error"]);
                                }
                            })
                            .catch((error) => {
                                reject(reason);
                            });
                    });
                },
                
                broadcast_transaction_synchronous: function(transaction) {
                    return new Promise((resolve, reject) => {
                        const method = "broadcast_transaction_synchronous";
                        const params = [ transaction ];
                
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
                }
            }
        }
    }
})();

__MODULE__ = module;
