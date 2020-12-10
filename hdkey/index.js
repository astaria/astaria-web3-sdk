var module = (function() {
    const crypto   = require('crypto'),
          networks = include('./networks.js');

    var _net = networks.MainNet;
    var _modulus;

    function _generate_public_key(private_key, compressed) {
        var curve = crypto.ecdsa.curve_from_name("k256");
        var secret_key = crypto.ecdsa.secret_key(curve, private_key);
        var secret = crypto.number_from_bits(secret_key.get());
        var pair = crypto.ecdsa.generate_keys(curve, secret);
    
        if (compressed) {
            var odd_y = crypto.is_odd_bits(pair.pub.get().y);
            var leading = crypto.bits_partial(8, odd_y ? 3 : 2);
    
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
        var IL = crypto.bits_slice(hash, 0, 256);
        var kpar = crypto.number_from_bits(hdkey.priv);
        var modulus = _modulus_for_child_key();
        var sum = crypto.number_from_bits(IL).add(kpar);
    
        if (sum.greaterEquals(modulus)) {
            sum = sum.sub(modulus);
        }
    
        return _number_to_bits(sum, 256);
    }
    
    function _build_child_public_key(hdkey, hash) {
        var IL = crypto.bits_slice(hash, 0, 256);
        var Kpar = crypto.number_from_bits(hdkey.pub);

    }
    
    function _modulus_for_child_key() {
        if (!_modulus) {
            _modulus = crypto.number_from_bits(
                crypto.hex_to_bits(
                    'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141'
                )
            )
        }
    
        return _modulus;
    }
    
    function _number_to_bits(number, length) {
        var bits = crypto.number_to_bits(number);
        var bits_length = crypto.bits_length(bits);
    
        if (bits_length < length) {
            return crypto.bits_concat(_zero_bits(length - bits_length), bits);
        }
    
        return bits;
    }
    
    function _zero_bits(length) {
        var bits = [];
    
        for (n = 0; n < length/8; ++n) {
            bits.push(0);
        }
    
        return bits;
    }
    
    return {
        from_root_seed: function(seed) {
            var secret = crypto.string_to_bits("Bitcoin seed");
            var hash = crypto.hmac.digest("sha512", secret, seed);
            var private_key = crypto.bits_slice(hash, 0, 256);
            var public_key = _generate_public_key(private_key, true);
            var chain_code = crypto.bits_slice(hash, 256, 512);
        
            return { 
                priv: private_key, 
                pub: public_key, 
                chain: chain_code, 
                depth: 0, 
                index: 0 
            }
        },
        
        from_extended_key: function(key) {
            return {
                
            };
        },
        
        derive_key_with_path: function(hdkey, path) {
            var elements = path.split('/');
            var root = elements[0];
            var self = this;
        
            if ((root === 'm' && hdkey.priv) || (root === 'M' && hdkey.pub)) {
                elements.slice(1).forEach(function (e) {
                    var hardened = (e.length > 1) && (e[e.length - 1] === "'")
                    var index = parseInt(e, 10);
                    
                    if (hdkey) {
                        hdkey = self.derive_child_key(hdkey, index, hardened);
                    }
                });
        
                return hdkey;
            }
        },
        
        derive_child_key: function(hdkey, index, hardened) {
            if (!isNaN(index) && index < 0x80000000) {
                var bits = _make_bits_for_child_key(hdkey, index, hardened);
        
                if (bits) {
                    var hash = crypto.hmac.digest("sha512", hdkey.chain, bits);
                    var depth = hdkey.depth + 1;
        
                    if (hdkey.priv) {
                        var private_key = _build_child_private_key(hdkey, hash);
                        var public_key = _generate_public_key(private_key, true);
                        var chain_code = crypto.bits_slice(hash, 256, 512);
                    
                        return { 
                            priv: private_key, 
                            pub: public_key, 
                            chain: chain_code, 
                            depth: depth, 
                            index: index 
                        }    
                    } else {
                        var public_key = _build_child_public_key(hdkey, hash);
                        var chain_code = crypto.bits_slice(hash, 256, 512);
        
                        return { 
                            pub: public_key, 
                            chain: chain_code, 
                            depth: depth, 
                            index: index 
                        }    
                    }
                }
            }
        },
        
        select_network: function(name) {
            _net = networks[name] || networks.TestNet;
        },
        
        configure_network: function(private, public) {
            _net = { 
                private: private, 
                public: public 
            }
        },
        
        version: function() {
            return "1.0";
        },
    }
})();

__MODULE__ = module;
