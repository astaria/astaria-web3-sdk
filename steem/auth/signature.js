SteemSignature = (function() {
    return {};
})();

SteemSignature.sign_message = function(message, key) {
    var digest = Steem.crypto.sha256.digest(Steem.crypto.bytes_to_bits(message));
    var paranoia = 0;
    
    while (true) {
        var n = key._curve.r,
            l = n.bitLength(),
            k = Steem.crypto.random_number(n.sub(1), paranoia).add(1),
            R = key._curve.G.mult(k);

        if (R.isIdentity) {
            continue;
        }
        
        var r = R.x.mod(n),
            ss = Steem.crypto.number_from_bits(digest).add(r.mul(key._exponent)),
            s = ss.mul(k.inverseMod(n)).mod(n),
            isOdd = Steem.crypto.is_odd_bits(R.y),
            recoveryParam = isOdd ? 32 : 31;
        
        var rBits = r.toBits(l);
        var sBits = s.toBits(l);
        
        var r0 = Steem.crypto.bits_extract(rBits, 0, 8);
        var r1 = Steem.crypto.bits_extract(rBits, 8, 8);
        var s0 = Steem.crypto.bits_extract(sBits, 0, 8);
        var s1 = Steem.crypto.bits_extract(sBits, 8, 8);
        
        if (!(r0 & 0x80)
            && !(r0 == 0 && !(r1 & 0x80))
            && !(s0 & 0x80)
            && !(s0 == 0 && !(s1 & 0x80))) {
            var rawSig = Steem.crypto.bits_concat(r.toBits(l), s.toBits(l));
            
            return Steem.crypto.bits_concat(
                [Steem.crypto.bits_partial(8, recoveryParam)], rawSig
            );
        }
    }
}

__MODULE__ = SteemSignature;
