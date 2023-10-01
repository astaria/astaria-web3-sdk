const module = (() => {
    const crypto = require("../crypto");

    const _vocab_map = {};

    function _get_bip39_vocab(lang) {
        if (!_vocab_map[lang || "en"]) {
            _vocab_map[lang || "en"] = include(this.__ENV__["dir-path"] + "/vocab/" + (lang || "en") + ".json");
        }

        return _vocab_map[lang || "en"];
    }

    function _find_word_index(vocab, word) {
        let left = 0;
        let right = vocab.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
        
            if (vocab[mid] === word) {
                return mid;
            }
        }

        return -1;
    }

    function _is_valid_words(words) {
        // TODO: implement it

        return false;
    }

    return {
        generate_words: (length, lang) => {
            const entropy = crypto.bytes_to_bits(random((length * 11 - length / 3) / 8));
            const checksum = crypto.bits_slice(crypto.sha256.digest(entropy), 0, length / 3);
            const vocab = _get_bip39_vocab(lang);
            const words = [];

            entropy = crypto.bits_concat(entropy, checksum);

            for (let i = 0; i < length; i++) {
                const index = crypto.bits_extract(entropy, i * 11, 11);

                words.push([ index, vocab[index] ]);
            }

            return words;
        },

        text_to_words: (text, seperator, lang) => {
            const vocab = _get_bip39_vocab(lang);
            const words = [];

            text.trim().split(seperator || " ").forEach((word) => {
                const index = _find_word_index(vocab, word);
                
                if (index != -1) {
                    words.push([ index, vocab[index] ]);
                }
            });

            return _is_valid_words(words) ? words : [];
        },

        words_to_text: (words, seperator) => {
            const values = [];

            words.forEach(([ _, word ]) => {
                values.push(word);
            });

            return values.join(seperator || " ");
        },
        
        words_to_list: (words) => {
            const values = [];

            words.forEach(([ _, word ]) => {
                values.push(word);
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

        search_words: (keyword, lang) => {
            const vocab = _get_bip39_vocab(lang);
            
            return vocab.filter((word) => {
                return word.startsWith(keyword);
            });
        }
    }
})();

__MODULE__ = module;
