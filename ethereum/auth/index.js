EthereumAuth = (function() {
    return {};
})();

EthereumAuth.signature = include("./signature.js");

EthereumAuth.generate_public_key = function(key) {
    var private_key = EthereumAuth.__strip_private_key(key);
    var curve = Ethereum.crypto.ecdsa.curve_from_name("k256");
    var secret = Ethereum.crypto.number_from_bits(private_key.get());
    var pair = Ethereum.crypto.ecdsa.generate_keys(curve, secret);

    return EthereumAuth.__build_public_key(pair.pub);
}

EthereumAuth.sign_message = function(message, key) {
    var private_key = EthereumAuth.__strip_private_key(key);
    var signature = EthereumAuth.signature.sign_message(message, private_key);
    var r = Ethereum.crypto.hex_from_bits(Ethereum.crypto.bits_slice(signature[0],   0, 256));
    var s = Ethereum.crypto.hex_from_bits(Ethereum.crypto.bits_slice(signature[0], 256, 512));
    var v = signature[1];

    return { "r":r, "s":s, "v":v };
}

EthereumAuth.__build_public_key = function(key) {
    var bits = Ethereum.crypto.bits_concat(key.get().x, key.get().y);
    var hash = Ethereum.crypto.keccak256.digest(bits);
    
    return '0x' + Ethereum.crypto.hex_from_bits(Ethereum.crypto.bits_slice(hash, 96, 256));
}

EthereumAuth.__strip_private_key = function(key) {
    var bits = Ethereum.crypto.hex_to_bits(key);
    var curve = Ethereum.crypto.ecdsa.curve_from_name("k256");

    return Ethereum.crypto.ecdsa.secret_key(curve, bits);
}

__MODULE__ = EthereumAuth;
