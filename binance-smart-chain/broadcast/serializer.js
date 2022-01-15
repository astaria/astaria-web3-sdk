var module = (function() {
    const utils = __KLAYTN__.utils,
          rlp = require("./rlp.js");

    function _number_to_data(number) {
        if (number && !number.isZero()) {
            return _hex_to_data(number.toString(16));
        }
    
        return "";
    }
    
    function _hex_to_data(hex) {
        var data = "";
    
        hex = ((hex.length % 2) == 1) ? "0" + hex : hex;
    
        for (var i = 0; i < hex.length; i += 2) {
            var char = parseInt(hex.charAt(i), 16) * 16 + parseInt(hex.charAt(i + 1), 16);
    
            data += String.fromCharCode(char);
        }
    
        return data;
    }
    
    function _data_to_hex(data) {
        var hex = "";
    
        for (var i = 0; i < data.length; ++i) {
            var number = Number(data.charCodeAt(i)).toString(16);
    
            hex += (number.length == 1) ? "0" + number : number;
        }
    
        return "0x" + hex;
    }

    return {
        serialize_transaction: function(transaction, for_signature) {
            if (for_signature) {
                return rlp.encode([
                    _number_to_data(transaction["nonce"]),
                    _number_to_data(transaction["gasPrice"]),
                    _number_to_data(transaction["gasLimit"]),
                    _number_to_data(transaction["to"]),
                    _number_to_data(transaction["value"]),
                    _number_to_data(transaction["data"]),
                    _number_to_data(transaction["chainId"]),
                    _number_to_data(utils.value_to_number(0)),
                    _number_to_data(utils.value_to_number(0))
                ]);
            } else {
                return _data_to_hex(rlp.encode([
                    _number_to_data(transaction["nonce"]),
                    _number_to_data(transaction["gasPrice"]),
                    _number_to_data(transaction["gasLimit"]),
                    _number_to_data(transaction["to"]),
                    _number_to_data(transaction["value"]),
                    _number_to_data(transaction["data"]),
                    _number_to_data(transaction["v"]),
                    _number_to_data(transaction["r"]),
                    _number_to_data(transaction["s"])
                ]));
            }
        },
    }
})();

__MODULE__ = module;
