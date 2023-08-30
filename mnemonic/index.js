const module = (() => {
    const crypto = require("crypto");

    const _words_map = {};

    function _is_valid_words(words) {
        // TODO: implement it

        return false;
    }

    function _get_words_map(dir_path, lang) {
        if (!_words_map[lang || "en"]) {
            _words_map[lang || "en"] = include(
                dir_path + "/words/" + (lang || "en") + ".json"
            );
        }

        return _words_map[lang || "en"];
    }

    return {
        generate_words: (length, lang) => {
            const catalog = controller.catalog("Wallet");
            const entropy = crypto.bytes_to_bits(random((length*11 - length/3)/8));
            const checksum = crypto.bits_slice(crypto.sha256.digest(entropy), 0, length/3);
            const words = [];

            entropy = crypto.bits_concat(entropy, checksum);

            for (let i = 0; i < length; i++) {
                const segment = crypto.bits_extract(entropy, i * 11, 11);
                const value = catalog.values("showcase", "bip39.words", (lang || "en").toUpperCase(), null, [ segment, 1 ])[0];

                words.push([ parseInt(value["number"]), value["word"] ]);
            }

            return words;
        },

        text_to_words: (text, seperator, lang) => {
            const catalog = controller.catalog("Wallet");
            const words = [];

            text.trim().split(seperator || " ").forEach((word) => {
                const identifier = "S_" + (lang || "en").toUpperCase() + "_" + word.toUpperCase();
                const value = catalog.value("showcase", "bip39.words", identifier);
                
                if (value) {
                    words.push([ parseInt(value["number"]), value["word"] ]);
                }
            });

            return _is_valid_words(words) ? words : [];
        },

        words_to_text: (words, seperator) => {
            const values = [];

            words.forEach((word) => {
                values.push(word[1]);
            });

            return values.join(seperator || " ");
        },
        
        words_to_list: (words, seperator) => {
            const values = [];

            words.forEach((word) => {
                values.push(word[1]);
            });

            return values;
        },
        
        words_to_seed: (words, passphrase) => {
            const password = this.words_to_text(words, " ");
            const salt = "mnemonic" + (passphrase || "");

            return crypto.pbkdf2.digest("sha512", password, salt, 2048, 512);
        },

        verify_words: (words) => {
            if (_is_valid_words(words)) {
                return true;
            }

            return false;
        },

        find_words: (keyword, lang) => {
            const words = _words_map[lang || "en"] = _words_map[lang || "en"] || include(
                this.__ENV__["dir-path"] + "/words/" + (lang || "en") + ".json"
            );

            if (words) {
                return words.filter((word) => {
                    return word.startsWith(keyword);
                });
            }
        }
    }
})();

__MODULE__ = module;
