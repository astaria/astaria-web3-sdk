const module = (() => {
    const crypto = __STEEM__.crypto, 
          signature = include("./signature.js");

    function _build_address(key) {
        const version = crypto.is_odd_bits(key.get().y) ? 0x3 : 0x2;
    
        return crypto.base58.check.encode(
            version, key.get().x, _checksum_for_key
        );
    }
    
    function _build_private_key(key) {
        const version = 0x80; // version for bitcoin mainnet
    
        return crypto.base58.check.encode(
            version, key.get()
        );
    }
    
    function _strip_private_key(key) {
        const wif = crypto.base58.check.decode(key);
        const curve = crypto.ecdsa.curve_from_name("k256");
    
        return crypto.ecdsa.secret_key(
            curve, crypto.bits_slice(wif, 8)
        );
    }
    
    function _checksum_for_key(bits) {
        return crypto.bits_slice(
            crypto.ripemd160.digest(bits), 0, 32
        );
    }
    
    return {
        generate_keys: (name, password, roles) => {
            const keys = {};
            
            roles.forEach((role) => {
                const seed = name + role + password;
                const brain_key = seed.trim().split(/[\t\n\v\f\r ]+/).join(' ');
                const secret = crypto.number_from_bits(
                    crypto.sha256.digest(crypto.string_to_bits(brain_key))
                );
                const curve = crypto.ecdsa.curve_from_name("k256");
                const pair = crypto.ecdsa.generate_keys(curve, secret);
                const public_key  = _build_public_key (pair.pub);
                const private_key = _build_private_key(pair.sec);
        
                keys[role] = { pub: public_key, priv: private_key };
            });
            
            return keys;
        },
        
        generate_address: (prefix, key) => {
            const private_key = _strip_private_key(key);
            const curve = crypto.ecdsa.curve_from_name("k256");
            const secret = crypto.number_from_bits(private_key.get());
            const pair = crypto.ecdsa.generate_keys(curve, secret);
        
            return prefix + _build_address(pair.pub);
        },
        
        decode_address: (prefix, address) => {
            const encoded_key = address.replace(new RegExp("^" +  prefix), "");
        
            return crypto.bytes_from_bits(
                crypto.base58.check.decode(
                    encoded_key, _checksum_for_key
                )
            );
        },
        
        sign_message: (chain_id, message, keys) => {
            const signatures = [];
        
            message = decode("hex", chain_id).concat(message);
        
            for (let key in keys) {
                const private_key = _strip_private_key(keys[key]);
        
                signatures.push(
                    crypto.hex_from_bits(
                        signature.sign_message(message, private_key)
                    )
                );
            };
        
            return signatures;
        }, 
    }
})();

__MODULE__ = module;
