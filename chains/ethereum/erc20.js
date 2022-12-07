var module = (function() {
    const api = __ETHEREUM__.api,
          broadcast = __ETHEREUM__.broadcast,
          abi = __ETHEREUM__.abi;

    return {
        name: function(token) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("name()");

                api.call(token, data)
                    .then(function(response) {
                        return abi.decode("(string)", response);
                    })
                    .then(function([ name ]) {
                        resolve(name);
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
                       return abi.decode("(string)", response);
                    })
                    .then(function([ symbol ]) {
                        resolve(symbol);
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
                        return abi.decode("(uint8)", response);
                    })
                    .then(function([ decimals ]) {
                        resolve(decimals);
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
                        return abi.decode("(uint256)", response);
                    })
                    .then(function([ supply ]) {
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
                        return abi.decode("(uint256)", response);
                    })
                    .then(function([ balance ]) {
                        resolve(balance);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        transfer: function(account, token, recipient, amount, gasPrice, key) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("transfer(address,uint256)", [ recipient, amount ]);
        
                broadcast.call(account, token, data, 0, gasPrice, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        approve: function(account, token, spender, amount, gasPrice, key) {
            return new Promise(function(resolve, reject) {
                var data = abi.encode("approve(address,uint256)", [ spender, amount ]);
        
                broadcast.call(account, token, data, 0, gasPrice, key)
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
                        return abi.decode("(uint256)", response);
                    })
                    .then(function([ allowance ]) {
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
