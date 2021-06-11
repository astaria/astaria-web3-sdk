var module = (function() {
    const net = __STEEM__.net, 
          
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
                    return response.json();
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
        get_dynamic_global_properties: function() {
            return new Promise(function(resolve, reject) {
                var method = "get_dynamic_global_properties";
                var params = [];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_created: function(tag, start_author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_created";
                var params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_trending: function(tag, start_author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_trending";
                var params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_hot: function(tag, start_author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_hot";
                var params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_feed: function(tag, start_author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_feed";
                var params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_blog: function(tag, start_author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_blog";
                var params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_comments: function(tag, start_author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_comments";
                var params = [ { tag:tag, start_author:start_author, start_permlink:start_permlink, limit:limit } ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_discussions_by_author_before_date: function(author, start_permlink, before_date, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_discussions_by_author_before_date";
                var params = [ author, start_permlink, before_date.toISOString().substring(0, 19), limit ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_replies_by_last_update: function(author, start_permlink, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_replies_by_last_update";
                var params = [ author, start_permlink, limit ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_content: function(author, permlink) {
            return new Promise(function(resolve, reject) {
                var method = "get_content";
                var params = [ author, permlink ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_content_replies: function(author, permlink) {
            return new Promise(function(resolve, reject) {
                var method = "get_content_replies";
                var params = [ author, permlink ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_active_votes: function(author, permlink) {
            return new Promise(function(resolve, reject) {
                var method = "get_active_votes";
                var params = [ author, permlink ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_accounts: function(names) {
            return new Promise(function(resolve, reject) {
                var method = "get_accounts";
                var params = [ names ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_account_history: function(account, from, limit) {
            return new Promise(function(resolve, reject) {
                var method = "get_account_history";
                var params = [ account, from, limit ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_followers: function(following, start_follower, follow_type, limit) {
            return new Promise(function(resolve, reject) {
                var method = "call";
                var params = [ "follow_api", "get_followers", [ following, start_follower, follow_type, limit ] ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_following: function(follower, start_following, follow_type, limit) {
            return new Promise(function(resolve, reject) {
                var method = "call";
                var params = [ "follow_api", "get_following", [ follower, start_following, follow_type, limit ] ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_follow_count: function(account) {
            return new Promise(function(resolve, reject) {
                var method = "call";
                var params = [ "follow_api", "get_follow_count", [ account ] ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_state: function(path) {
            return new Promise(function(resolve, reject) {
                var method = "call";
                var params = [ "database_api", "get_state", [ path ] ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        resolve(response["result"]);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        get_block: function(block) {
            return new Promise(function(resolve, reject) {
                var method = "get_block";
                var params = [ block ];
        
                _request_rpc(method, params)
                    .then(function(response) {
                        if (response["result"]) {
                            resolve(response["result"]);
                        } else {
                            reject(response["error"]);
                        }
                    })
                    .catch(function(error) {
                        reject(reason);
                    });
            });
        },
        
        broadcast_transaction_synchronous: function(transaction) {
            return new Promise(function(resolve, reject) {
                var method = "broadcast_transaction_synchronous";
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
    };
})();

__MODULE__ = module;
