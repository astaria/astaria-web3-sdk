var module = (function() {
    const api = __ETHEREUM__.api,
          broadcast = __ETHEREUM__.broadcast,
          utils = __ETHEREUM__.utils,
          abi = __ETHEREUM__.abi;

    return {
        get_balance: function(contract, address) {
            return new Promise(function(resolve, reject) {
                var object = {
                    "to": contract,
                    "data": abi.encode("balanceOf(address)", [ address ])
                    //"data": "0x70a08231" + "000000000000000000000000" + address.replace("0x", "")
                };
        
                api.call(object, "latest")
                    .then(function(response) {
                        var [ balance_wei ] = abi.decode("(uint256)", response);
        
                        resolve(utils.wei_to_number(balance_wei, "ether"));
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
        
        transfer: function(contract, from, to, amount, fee, key) {
            return new Promise(function(resolve, reject) {
                var amount_wei = utils.value_to_wei(amount, "ether");
                var data = abi.encode("transfer(address,uint256)", [ to, amount_wei ]);
                /*
                var data = "0xa9059cbb"
                         + "000000000000000000000000" + to.replace("0x", "")
                         + utils.number_to_hex(amount_wei, 64).replace("0x", "")
                */
        
                broadcast.call(from, contract, data, fee, key)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },        
    }
})();

__MODULE__ = module;
