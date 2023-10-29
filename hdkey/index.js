const module = (function() {
    const crypto   = require("../crypto"),
          networks = require("./networks");

    var _net = networks.Mainnet;
    var _modulus;

    function _derive_child_key(hdkey, index, hardened) {
        const bits = _make_bits_for_child_key(hdkey, index, hardened);
    
        if (bits) {
            const hash = crypto.hmac.digest("sha512", hdkey.chain, bits);
            const depth = hdkey.depth + 1;

            if (hdkey.priv) {
                const private_key = _build_child_private_key(hdkey, hash);
                const public_key = _generate_public_key(private_key, true);
                const chain_code = crypto.bits_slice(hash, 256, 512);
            
                return { priv: private_key, pub: public_key, chain: chain_code, depth: depth, index: index }    
            } else {
                const public_key = _build_child_public_key(hdkey, hash);
                const chain_code = crypto.bits_slice(hash, 256, 512);

                return { pub: public_key, chain: chain_code, depth: depth, index: index }    
            }
        }
    }

    function _generate_public_key(private_key, compressed) {
        const curve = crypto.ecdsa.curve_from_name("k256");
        const secret_key = crypto.ecdsa.secret_key(curve, private_key);
        const secret = crypto.number_from_bits(secret_key.get());
        const pair = crypto.ecdsa.generate_keys(curve, secret);
    
        if (compressed) {
            const odd_y = crypto.is_odd_bits(pair.pub.get().y);
            const leading = crypto.bits_partial(8, odd_y ? 3 : 2);
    
            return crypto.bits_concat([leading], pair.pub.get().x);
        }
    
        return crypto.bits_concat(pair.pub.get().x, pair.pub.get().y);
    }
    
    function _make_bits_for_child_key(hdkey, index, hardened) {
        if (hardened) {
            if (hdkey.priv) {
                return crypto.bits_concat(
                    crypto.bits_concat(
                        [crypto.bits_partial(8, 0)], hdkey.priv
                    ), 
                    [crypto.bits_partial(32, 0x80000000 + index)]
                );    
            }
        } else {
            return crypto.bits_concat(
                hdkey.pub, [crypto.bits_partial(32, index)]
            );
        }
    }
    
    function _build_child_private_key(hdkey, hash) {
        const IL = crypto.bits_slice(hash, 0, 256);
        const kpar = crypto.number_from_bits(hdkey.priv);
        const modulus = _modulus_for_child_key();
        const sum = crypto.number_from_bits(IL).add(kpar);
    
        if (sum.greaterEquals(modulus)) {
            sum = sum.sub(modulus);
        }
    
        return _number_to_bits(sum, 256);
    }
    
    function _build_child_public_key(hdkey, hash) {
        const IL = crypto.bits_slice(hash, 0, 256);
        const Kpar = crypto.number_from_bits(hdkey.pub);


    }
    
    function _modulus_for_child_key() {
        if (!_modulus) {
            _modulus = crypto.number_from_bits(
                crypto.hex_to_bits(
                    'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141'
                )
            );
        }
    
        return _modulus;
    }
    
    function _number_to_bits(number, length) {
        const bits = crypto.number_to_bits(number);
        const bits_length = crypto.bits_length(bits);
    
        if (bits_length < length) {
            return crypto.bits_concat(_zero_bits(length - bits_length), bits);
        }
    
        return bits;
    }
    
    function _zero_bits(length) {
        const bits = [];
    
        for (n = 0; n < length/8; ++n) {
            bits.push(0);
        }
    
        return bits;
    }

    return {
        select_network: function(name) {
            _net = networks[name] || networks.Testnet;
        },
        
        configure_network: function(private, public) {
            _net = { private: private, public: public }
        },

        from_master_seed: function(seed) {
            const secret = crypto.string_to_bits("Bitcoin seed");
            const hash = crypto.hmac.digest("sha512", secret, seed);
            const private_key = crypto.bits_slice(hash, 0, 256);
            const public_key = _generate_public_key(private_key, true);
            const chain_code = crypto.bits_slice(hash, 256, 512);
        
            return { priv: private_key, pub: public_key, chain: chain_code, depth: 0, index: 0 }
        },

        from_extended_key: function(key) {
            return {}
        },
        
        derive_key_with_path: function(hdkey, path) {
            const elements = path.split('/');
            const root = elements[0];
            
            if ((root === 'm' && hdkey.priv) || (root === 'M' && hdkey.pub)) {
                elements.slice(1).forEach(function (e) {
                    const hardened = (e.length > 1) && (e[e.length - 1] === "'")
                    const index = parseInt(e, 10);
                    
                    if (hdkey && !isNaN(index) && index < 0x80000000) {
                        hdkey = _derive_child_key(hdkey, index, hardened);
                    }
                });
        
                return hdkey;
            }
        },
    }
})();

__MODULE__ = module;
