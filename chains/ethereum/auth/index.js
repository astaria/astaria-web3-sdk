const module = (() => {
    const crypto = __ETHEREUM__.crypto,
          signature = require("./signature");

    function _build_address(key) {
        const bits = crypto.bits_concat(key.get().x, key.get().y);
        const hash = crypto.keccak256.digest(bits);
        
        return '0x' + crypto.hex_from_bits(crypto.bits_slice(hash, 96, 256));
    }
    
    function _strip_private_key(key) {
        const bits = crypto.hex_to_bits(key);
        const curve = crypto.ecdsa.curve_from_name("k256");
    
        return crypto.ecdsa.secret_key(curve, bits);
    }

    return {
        generate_address: (key) => {
            const private_key = _strip_private_key(key);
            const curve = crypto.ecdsa.curve_from_name("k256");
            const secret = crypto.number_from_bits(private_key.get());
            const pair = crypto.ecdsa.generate_keys(curve, secret);
            
            return _build_address(pair.pub);
        },

        sign_message: (message, key) => {
            const private_key = _strip_private_key(key);
            const [ r, s, v ] = signature.sign_message(message, private_key);

            return { 
                "r": "0x" + crypto.hex_from_bits(r), 
                "s": "0x" + crypto.hex_from_bits(s), 
                "v": v
            };
        },
    }
})();

__MODULE__ = module;
