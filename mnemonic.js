Mnemonic = (function() {
    return {}
})();

Mnemonic.crypto = require('crypto');

Mnemonic.generate_words = function(lang, length) {
    var catalog = controller.catalog("Wallet");
    var entropy = Mnemonic.crypto.bytes_to_bits(random((length*11 - length/3)/8));
    var checksum = Mnemonic.crypto.bits_slice(Mnemonic.crypto.sha256.digest(entropy), 0, length/3);
    var words = [];

    entropy = Mnemonic.crypto.bits_concat(entropy, checksum);

    for (var i = 0; i < length; i++) {
        var segment = Mnemonic.crypto.bits_extract(entropy, i * 11, 11);
        var value = catalog.values("showcase", "bip39.words", (lang || "en").toUpperCase(), null, [ segment, 1 ])[0];

        words.push([ parseInt(value["number"]), value["word"] ]);
    }

    return words;
}

Mnemonic.text_to_words = function(text, seperator, lang) {
    var catalog = controller.catalog("Wallet");
    var words = [];

    text.split(seperator).forEach(function(word) {
        var identifier = "S_" + word.toUpperCase() + "." + (lang || "en").toUpperCase();
        var value = catalog.value("showcase", "bip39.words", identifier);

        if (value) {
            words.push([ parseInt(value["number"]), value["word"] ]);
        }
    });

    return words;
}

Mnemonic.words_to_seed = function(words, passphrase) {
    var password = Mnemonic.words_to_text(words, " ");
    var salt = "mnemonic" + (passphrase || "");

    return Mnemonic.crypto.pbkdf2.digest("sha512", password, salt, 2048, 512);
}

Mnemonic.words_to_text = function(words, seperator) {
    var values = [];

    words.forEach(function(word) {
        values.push(word[1]);
    });

    return values.join(seperator);
}

Mnemonic.verify_words = function(words) {
    // TODO: implement
    
    return false;
}

__MODULE__ = Mnemonic;
