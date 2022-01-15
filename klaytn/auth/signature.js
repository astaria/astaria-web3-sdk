var module = (function() {
    const crypto = __KLAYTN__.crypto;

    function _message_to_bits(message) {
        var bytes = [];
    
        for (var i = 0; i < message.length; ++i) {
            bytes.push(message.charCodeAt(i));
        }
    
        return crypto.bytes_to_bits(bytes);
    }
    
    return {
        sign_message: function(message, key) {
            var digest = crypto.keccak256.digest(_message_to_bits(message));
            
            while (true) {
                var n = key._curve.r,
                    l = n.bitLength(),
                    k = crypto.random_number(n.sub(1)).add(1),
                    R = key._curve.G.mult(k);

                if (R.isIdentity) {
                    continue;
                }
                
                var r = R.x.mod(n),
                    ss = crypto.number_from_bits(digest).add(r.mul(key._exponent)),
                    s = ss.mul(k.inverseMod(n)).mod(n),
                    recoveryParam = crypto.is_odd_number(R.y) ? 1 : 0;
                
                var rBits = crypto.number_to_bits(r, l);
                var sBits = crypto.number_to_bits(s, l);
                
                var r0 = crypto.bits_extract(rBits, 0, 8);
                var r1 = crypto.bits_extract(rBits, 8, 8);
                var s0 = crypto.bits_extract(sBits, 0, 8);
                var s1 = crypto.bits_extract(sBits, 8, 8);

                if (!(r0 & 0x80) && !(r0 == 0 && !(r1 & 0x80)) && !(s0 & 0x80) && !(s0 == 0 && !(s1 & 0x80))) {
                    return [ rBits, sBits, recoveryParam ];
                }
            }
        },
    };
})();

__MODULE__ = module;
