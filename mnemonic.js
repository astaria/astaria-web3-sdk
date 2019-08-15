Mnemonic = (function() {
    return {}
})();

Mnemonic.generate_words = function(lang) {
    var catalog = controller.catalog("Wallet");
    var values = catalog.values("showcase", "bip39.words", (lang || "en").toUpperCase(), null, [ 0, 12 ], [ null, "random"]);
    var words = [];

    values.forEach(function(value) {
        words.push([ parseInt(value["number"]), value["word"] ]);
    });

    return words;
}

Mnemonic.text_to_words = function(text, lang) {
    var catalog = controller.catalog("Wallet");
    var words = [];

    text.trim().split(" ").forEach(function(word) {
        var identifier = "S_" + word.toUpperCase()+ "." + (lang || "en").toUpperCase();
        var value = catalog.value("showcase", "bip39.words", identifier);

        if (value) {
            words.push([ parseInt(value["number"]), value["word"] ]);
        }
    });

    if (words.length != 12) {
        return [];
    }

    return words;
}

Mnemonic.words_to_text = function(words) {
    var text = "";

    words.forEach(function(word) {
        text += word[1] + " ";
    });

    return text;
}

Mnemonic.words_to_number = function(words) {
    var number = "";

    words.forEach(function(word) {
        var hex = word[0].toString(16);
    
        number += (hex.length == 1) ? "0" + hex : hex;
    });

    return number;
}

__MODULE__ = Mnemonic;
