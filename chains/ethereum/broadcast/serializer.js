const module = (function() {
    const utils = __ETHEREUM__.utils,
          rlp = include("./rlp.js");

    function _value_to_data(value) {
        if (value instanceof BigNumber && !value.isZero()) {
            return _hex_to_data(value.toString(16));
        }
        
        if (typeof(value) === 'string' && value.startsWith('0x')) {
            return _hex_to_data(value.replace(/^0x0*/, ''));
        }

        if (typeof(value) === 'number' && value !== 0) {
            return _hex_to_data(value.toString(16));
        }
    
        return "";
    }

    function _string_to_data(value) {
        return _hex_to_data(value.replace(/^0x/, ''));
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

    function _data_to_hex(tag, data) {
        var hex = "";
    
        for (var i = 0; i < data.length; ++i) {
            var number = Number(data.charCodeAt(i)).toString(16);
    
            hex += (number.length == 1) ? "0" + number : number;
        }
    
        return (tag || "0x") + hex;
    }

    return {
        serialize_transaction: function(transaction, for_signature) {
            if (for_signature) {
                return rlp.encode([
                    _value_to_data(transaction["nonce"]),
                    _value_to_data(transaction["gasPrice"]),
                    _value_to_data(transaction["gas"]),
                    _string_to_data(transaction["to"]),
                    _value_to_data(transaction["value"] || 0),
                    _string_to_data(transaction["data"] || ""),
                    _value_to_data(transaction["chainId"]),
                    _value_to_data(0),
                    _value_to_data(0)
                ]);
            } else {
                return _data_to_hex("", rlp.encode([
                    _value_to_data(transaction["nonce"]),
                    _value_to_data(transaction["gasPrice"]),
                    _value_to_data(transaction["gas"]),
                    _string_to_data(transaction["to"]),
                    _value_to_data(transaction["value"] || 0),
                    _string_to_data(transaction["data"] || ""),
                    _value_to_data(transaction["v"]),
                    _value_to_data(transaction["r"]),
                    _value_to_data(transaction["s"])
                ]));
            }
        },
    }
})();

__MODULE__ = module;
