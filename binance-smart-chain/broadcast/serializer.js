var module = (function() {
    const rlp = require("utils/rlp.js");

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
        serialize_transaction: function(transaction, format) {
            var buffer = [];
        
            buffer.push(_number_to_data(transaction["nonce"]));
            buffer.push(_number_to_data(transaction["gasPrice"]));
            buffer.push(_number_to_data(transaction["gasLimit"]));
            buffer.push(_number_to_data(transaction["to"]));
            buffer.push(_number_to_data(transaction["value"] || ""));
            buffer.push(_number_to_data(transaction["data"] || ""));
            buffer.push(_number_to_data(transaction["v"]));
            buffer.push(_number_to_data(transaction["r"]));
            buffer.push(_number_to_data(transaction["s"]));
        
            transaction = rlp.encode(buffer);
            
            if (format === "hex") {
                transaction = _data_to_hex(transaction);
            }
        
            return transaction;
        },
    }
})();

__MODULE__ = module;
