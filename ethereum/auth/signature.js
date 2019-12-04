EthereumSignature = (function() {
    return {};
})();

EthereumSignature.sign_message = function(message, key) {
    var digest = Ethereum.crypto.keccak256.digest(EthereumSignature.__message_to_bits(message));
    var paranoia = 0;
    
    while (true) {
        var n = key._curve.r,
            l = n.bitLength(),
            k = Ethereum.crypto.random_number(n.sub(1), paranoia).add(1),
            R = key._curve.G.mult(k);

        if (R.isIdentity) {
            continue;
        }
        
        var r = R.x.mod(n),
            ss = Ethereum.crypto.number_from_bits(digest).add(r.mul(key._exponent)),
            s = ss.mul(k.inverseMod(n)).mod(n),
            isOdd = Ethereum.crypto.is_odd_bits(R.y),
            recoveryParam = isOdd ? 1 : 0;
        
        var rBits = r.toBits(l);
        var sBits = s.toBits(l);
        
        var r0 = Ethereum.crypto.bits_extract(rBits, 0, 8);
        var r1 = Ethereum.crypto.bits_extract(rBits, 8, 8);
        var s0 = Ethereum.crypto.bits_extract(sBits, 0, 8);
        var s1 = Ethereum.crypto.bits_extract(sBits, 8, 8);
        
        if (!(r0 & 0x80)
            && !(r0 == 0 && !(r1 & 0x80))
            && !(s0 & 0x80)
            && !(s0 == 0 && !(s1 & 0x80))) {
            var rawSig = Ethereum.crypto.bits_concat(r.toBits(l), s.toBits(l));

            return [ rawSig, recoveryParam ];
        }
    }
}

EthereumSignature.__message_to_bits = function(message) {
    var bytes = [];

    for (var i = 0; i < message.length; ++i) {
        bytes.push(message.charCodeAt(i));
    }

    return Ethereum.crypto.bytes_to_bits(bytes);
}

__MODULE__ = EthereumSignature;
