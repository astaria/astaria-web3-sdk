const module = (() => {
    const abi = __ETHEREUM__.abi;

    return {
        create: (api, broadcast) => {
            return {
                name: (token) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("name()");
        
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
        
                symbol: (token) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("symbol()");
        
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
        
                decimals: (token) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("decimals()");
        
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
        
                total_supply: (token) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("totalSupply()");
        
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
        
                balance_of: (token, account) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("balanceOf(address)", [ account ]);
        
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
        
                transfer: (account, token, recipient, amount, gasPrice, key) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("transfer(address,uint256)", [ recipient, amount ]);
                
                        broadcast.call(account, token, data, 0, gasPrice, key)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                approve: (account, token, spender, amount, gasPrice, key) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("approve(address,uint256)", [ spender, amount ]);
                
                        broadcast.call(account, token, data, 0, gasPrice, key)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                },
        
                allowance: (token, owner, spender) => {
                    return new Promise((resolve, reject) => {
                        var data = abi.encode("allowance(address,address)", [ owner, spender ]);
        
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
