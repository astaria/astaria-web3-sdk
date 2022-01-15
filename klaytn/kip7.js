var module = (function() {
    const api = __KLAYTN__.api,
          broadcast = __KLAYTN__.broadcast,
          abi = __KLAYTN__.abi;

    return {
        name: function(token) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("name()");

                api.call(token, data)
                    .then(function(response) {
                        var [ name ] = abi.decode("(string)", response);

                        if (name) {
                            resolve(name);
                        } else {
                            reject({ "status": 404 });
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        symbol: function(token) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("symbol()");

                api.call(token, data)
                    .then(function(response) {
                        var [ symbol ] = abi.decode("(string)", response);

                        if (symbol) {
                            resolve(symbol);
                        } else {
                            reject({ "status": 404 });
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        decimals: function(token) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("decimals()");

                api.call(token, data)
                    .then(function(response) {
                        var [ decimals ] = abi.decode("(uint8)", response);
        
                        if (decimals) {
                            resolve(decimals);
                        } else {
                            reject({ "status": 404 });
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        total_supply: function(token) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("totalSupply()");

                api.call(token, data)
                    .then(function(response) {
                        var [ supply ] = abi.decode("(uint256)", response);
        
                        resolve(supply);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        balance_of: function(token, account) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("balanceOf(address)", [ account ]);

                api.call(token, data)
                    .then(function(response) {
                        var [ balance ] = abi.decode("(uint256)", response);
        
                        resolve(balance);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        transfer: function(token, from, to, amount, key) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("transfer(address,uint256)", [ to, amount ]);
        
                broadcast.call(from, token, data, 0, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        approve: function(token, account, spender, amount, key) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("approve(address,uint256)", [ spender, amount ]);
        
                broadcast.call(account, token, data, 0, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        allowance: function(token, owner, spender) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("allowance(address,address)", [ owner, spender ]);

                api.call(token, data)
                    .then(function(response) {
                        var [ allowance ] = abi.decode("(uint256)", response);
        
                        resolve(allowance);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
    }
})();

__MODULE__ = module;
