HDKey = (function() {
    return {}
})();

HDKey.crypto   = require('crypto');
HDKey.networks = include('./networks.js');

HDKey.net = HDKey.networks.MainNet;

HDKey.from_root_seed = function(seed) {
    var secret = HDKey.crypto.string_to_bits("Bitcoin seed");
    var hash = HDKey.crypto.hmac.digest("sha512", secret, seed);
    var private_key = HDKey.crypto.bits_slice(hash, 0, 256);
    var public_key = HDKey.__generate_public_key(private_key, true);
    var chain_code = HDKey.crypto.bits_slice(hash, 256, 512);

    return { priv:private_key, pub:public_key, chain:chain_code, depth:0, index:0 }
}

HDKey.from_extended_key = function(key) {
    return {};
}

HDKey.derive_key_with_path = function(hdkey, path) {
    var elements = path.split('/');
    var root = elements[0];

    if ((root === 'm' && hdkey.priv) || (root === 'M' && hdkey.pub)) {
        elements.slice(1).forEach(function (e) {
            var hardened = (e.length > 1) && (e[e.length - 1] === "'")
            var index = parseInt(e, 10);
            
            if (hdkey) {
                hdkey = HDKey.derive_child_key(hdkey, index, hardened);
            }
        });

        return hdkey;
    }
}

HDKey.derive_child_key = function(hdkey, index, hardened) {
    if (!isNaN(index) && index < 0x80000000) {
        var bits = HDKey.__make_bits_for_child_key(hdkey, index, hardened);

        if (bits) {
            var hash = HDKey.crypto.hmac.digest("sha512", hdkey.chain, bits);
            var depth = hdkey.depth + 1;

            if (hdkey.priv) {
                var private_key = HDKey.__build_child_private_key(hdkey, hash);
                var public_key = HDKey.__generate_public_key(private_key, true);
                var chain_code = HDKey.crypto.bits_slice(hash, 256, 512);
            
                return { priv:private_key, pub:public_key, chain:chain_code, depth:depth, index:index }    
            } else {
                var public_key = HDKey.__build_child_public_key(hdkey, hash);
                var chain_code = HDKey.crypto.bits_slice(hash, 256, 512);

                return { pub:public_key, chain:chain_code, depth:depth, index:index }    
            }
        }
    }
}

HDKey.select_network = function(name) {
    HDKey.net = HDKey.networks[name] || HDKey.networks.TestNet;
}

HDKey.configure_network = function(private, public) {
    HDKey.net = { private:private, public:public }
}

HDKey.__generate_public_key = function(private_key, compressed) {
    var curve = HDKey.crypto.ecdsa.curve_from_name("k256");
    var secret_key = HDKey.crypto.ecdsa.secret_key(curve, private_key);
    var secret = HDKey.crypto.number_from_bits(secret_key.get());
    var pair = HDKey.crypto.ecdsa.generate_keys(curve, secret);

    if (compressed) {
        var odd_y = HDKey.crypto.is_odd_bits(pair.pub.get().y);
        var leading = HDKey.crypto.bits_partial(8, odd_y ? 3 : 2);

        return HDKey.crypto.bits_concat([leading], pair.pub.get().x);
    }

    return HDKey.crypto.bits_concat(pair.pub.get().x, pair.pub.get().y);
}

HDKey.__make_bits_for_child_key = function(hdkey, index, hardened) {
    if (hardened) {
        if (hdkey.priv) {
            return HDKey.crypto.bits_concat(
                HDKey.crypto.bits_concat(
                    [HDKey.crypto.bits_partial(8, 0)], hdkey.priv
                ), 
                [HDKey.crypto.bits_partial(32, 0x80000000 + index)]
            );    
        }
    } else {
        return HDKey.crypto.bits_concat(
            hdkey.pub, [HDKey.crypto.bits_partial(32, index)]
        );
    }
}

HDKey.__build_child_private_key = function(hdkey, hash) {
    var IL = HDKey.crypto.bits_slice(hash, 0, 256);
    var kpar = HDKey.crypto.number_from_bits(hdkey.priv);
    var modulus = HDKey.__modulus_for_child_key();
    var sum = HDKey.crypto.number_from_bits(IL).add(kpar);

    if (sum.greaterEquals(modulus)) {
        sum = sum.sub(modulus);
    }

    return HDKey.__number_to_bits(sum, 256);
}

HDKey.__build_child_public_key = function(hdkey, hash) {
    var IL = HDKey.crypto.bits_slice(hash, 0, 256);
    var Kpar = HDKey.crypto.number_from_bits(hdkey.pub);
}

HDKey.__modulus_for_child_key = function() {
    if (!HDKey.__modulus) {
        HDKey.__modulus = HDKey.crypto.number_from_bits(
            HDKey.crypto.hex_to_bits(
                'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141'
            )
        )
    }

    return HDKey.__modulus;
}

HDKey.__number_to_bits = function(number, length) {
    var bits = HDKey.crypto.number_to_bits(number);
    var bits_length = HDKey.crypto.bits_length(bits);

    if (bits_length < length) {
        return HDKey.crypto.bits_concat(HDKey.__zero_bits(length - bits_length), bits);
    }

    return bits;
}

HDKey.__zero_bits = function(length) {
    var bits = [];

    for (n = 0; n < length/8; ++n) {
        bits.push(0);
    }

    return bits;
}

__MODULE__ = HDKey;
