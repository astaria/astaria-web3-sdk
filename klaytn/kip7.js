var module = (function() {
    const api = __KLAYTN__.api,
          broadcast = __KLAYTN__.broadcast,
          utils = __KLAYTN__.utils;

    return {
        get_balance: function(contract, address) {
            return new Promise(function(resolve, reject) {
                var object = {
                    "data": "0x70a08231" + "000000000000000000000000" + address.replace("0x", ""),
                    "to": contract
                };
        
                api.call(object, "latest")
                    .then(function(response) {
                        var wei = utils.value_to_number(response);
        
                        resolve(utils.wei_to_number(wei, "ether"));
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        transfer: function(contract, from, to, amount, fee, key) {
            return new Promise(function(resolve, reject) {
                var amount_wei = utils.value_to_wei(amount, "ether");
                var data = "0xa9059cbb"
                         + "000000000000000000000000" + to.replace("0x", "")
                         + utils.number_to_hex(amount_wei, 64).replace("0x", "")
        
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
