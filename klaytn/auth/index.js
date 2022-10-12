var module = (function() {
    const crypto = __KLAYTN__.crypto,
          utils = __KLAYTN__.utils,
          signature = include("./signature.js");

    function _build_address(key) {
        var bits = crypto.bits_concat(key.get().x, key.get().y);
        var hash = crypto.keccak256.digest(bits);
        
        return '0x' + crypto.hex_from_bits(crypto.bits_slice(hash, 96, 256));
    }
    
    function _strip_private_key(key) {
        var bits = crypto.hex_to_bits(key);
        var curve = crypto.ecdsa.curve_from_name("k256");
    
        return crypto.ecdsa.secret_key(curve, bits);
    }

    return {
        generate_address: function(key) {
            var private_key = _strip_private_key(key);
            var curve = crypto.ecdsa.curve_from_name("k256");
            var secret = crypto.number_from_bits(private_key.get());
            var pair = crypto.ecdsa.generate_keys(curve, secret);
            
            return _build_address(pair.pub);
        },

        sign_message: function(message, key) {
            var private_key = _strip_private_key(key);
            var [ r, s, v ] = signature.sign_message(message, private_key);

            return { 
                "r": "0x" + crypto.hex_from_bits(r), 
                "s": "0x" + crypto.hex_from_bits(s), 
                "v": v
            };
        },
    }
})();

__MODULE__ = module;
