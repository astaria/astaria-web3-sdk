EOSAuth = (function() {
    return {};
})();

EOSAuth.generate_public_key = function(key) {
    var private_key = EOSAuth.__strip_private_key(key);
    var curve = EOS.crypto.ecdsa.curve_from_name("k256");
    var secret = EOS.crypto.number_from_bits(private_key.get());
    var pair = EOS.crypto.ecdsa.generate_keys(curve, secret);

    return EOSAuth.__build_public_key(pair.pub);
}

EOSAuth.generate_private_key = function(seed) {
    var key = EOS.crypto.sha256.hash(EOS.crypto.hex_to_bits(seed));

    return EOS.crypto.hex_from_bits(key);
}

__MODULE__ = EOSAuth;
