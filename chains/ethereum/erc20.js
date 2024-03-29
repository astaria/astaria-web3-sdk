const module = (function() {
    const abi = __ETHEREUM__.abi;

    return {
        create: function(api, broadcast) {
            return {
                name: function(token) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("name()");
        
                        api.call(token, data)
                            .then((response) => {
                                return abi.decode("(string)", response);
                            })
                            .then(([ name ]) => {
                                resolve(name);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                symbol: function(token) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("symbol()");
        
                        api.call(token, data)
                            .then((response) => {
                               return abi.decode("(string)", response);
                            })
                            .then(([ symbol ]) => {
                                resolve(symbol);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                decimals: function(token) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("decimals()");
        
                        api.call(token, data)
                            .then((response) => {
                                return abi.decode("(uint8)", response);
                            })
                            .then(([ decimals ]) => {
                                resolve(decimals);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                total_supply: function(token) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("totalSupply()");
        
                        api.call(token, data)
                            .then((response) => {
                                return abi.decode("(uint256)", response);
                            })
                            .then(([ supply ]) => {
                                resolve(supply);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                balance_of: function(token, account) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("balanceOf(address)", [ account ]);
        
                        api.call(token, data)
                            .then((response) => {
                                return abi.decode("(uint256)", response);
                            })
                            .then(([ balance ]) => {
                                resolve(balance);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                transfer: function(account, token, recipient, amount, gasPrice, key) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("transfer(address,uint256)", [ recipient, amount ]);
                
                        broadcast.call(account, token, data, 0, gasPrice, key)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                approve: function(account, token, spender, amount, gasPrice, key) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("approve(address,uint256)", [ spender, amount ]);
                
                        broadcast.call(account, token, data, 0, gasPrice, key)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                allowance: function(token, owner, spender) {
                    return new Promise((resolve, reject) => {
                        const data = abi.encode("allowance(address,address)", [ owner, spender ]);
        
                        api.call(token, data)
                            .then((response) => {
                                return abi.decode("(uint256)", response);
                            })
                            .then(([ allowance ]) => {
                                resolve(allowance);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },      
            }
        }
    }
})();

__MODULE__ = module;
