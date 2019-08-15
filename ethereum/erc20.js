ERC20 = (function() {
    return {}
})();

ERC20.get_balance = function(contract, address) {
    return new Promise(function(resolve, reject) {
        var object = {
            "data":"0x70a08231" + "000000000000000000000000" + address.replace("0x", ""),
            "to":contract
        };

        Ethereum.api.call(object, "latest").then(function(response) {
            var wei = EthereumUtils.value_to_number(response);

            resolve(EthereumUtils.wei_to_number(wei, "ether"));
        }, function(reason) {
            reject(reason);
        });
    });
}

ERC20.transfer = function(contract, from, to, amount, fee, key) {
    return new Promise(function(resolve, reject) {
        var amount_wei = EthereumUtils.value_to_wei(amount, "ether");
        var data = "0xa9059cbb"
                 + "000000000000000000000000" + to.replace("0x", "")
                 + EthereumUtils.number_to_hex(amount_wei, 64).replace("0x", "")

        Ethereum.broadcast.call(from, contract, data, fee, key).then(function(response) {
            resolve(response);
        }, function(reason) {
            reject(reason);
        });
    });
}

__MODULE__ = ERC20;
