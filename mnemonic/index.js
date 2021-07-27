var module = (function() {
    const crypto = require('crypto');

    function _is_valid_words(words) {
        return true;
    }

    return {
        generate_words: function(length, lang) {
            var catalog = controller.catalog("Wallet");
            var entropy = crypto.bytes_to_bits(random((length*11 - length/3)/8));
            var checksum = crypto.bits_slice(crypto.sha256.digest(entropy), 0, length/3);
            var words = [];

            entropy = crypto.bits_concat(entropy, checksum);

            for (var i = 0; i < length; i++) {
                var segment = crypto.bits_extract(entropy, i * 11, 11);
                var value = catalog.values("showcase", "bip39.words", (lang || "en").toUpperCase(), null, [ segment, 1 ])[0];

                words.push([ parseInt(value["number"]), value["word"] ]);
            }

            return words;
        },

        text_to_words: function(text, seperator, lang) {
            var catalog = controller.catalog("Wallet");
            var words = [];

            text.trim().split(seperator || " ").forEach(function(word) {
                var identifier = "S_" + (lang || "en").toUpperCase() + "_" + word.toUpperCase();
                var value = catalog.value("showcase", "bip39.words", identifier);
                
                if (value) {
                    words.push([ parseInt(value["number"]), value["word"] ]);
                }
            });

            return _is_valid_words(words) ? words : [];
        },

        words_to_text: function(words, seperator) {
            var values = [];

            words.forEach(function(word) {
                values.push(word[1]);
            });

            return values.join(seperator || " ");
        },
        
        words_to_seed: function(words, passphrase) {
            var password = this.words_to_text(words, " ");
            var salt = "mnemonic" + (passphrase || "");

            return crypto.pbkdf2.digest("sha512", password, salt, 2048, 512);
        },

        verify_words: function(words) {
            // TODO: implement

            return false;
        },
    }
})();

__MODULE__ = module;
