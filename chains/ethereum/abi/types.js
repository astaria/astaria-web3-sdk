const module = (() => {
    const _padding_string = "0000000000000000000000000000000000000000000000000000000000000000";

    function _value_to_hex(value) {
        if (typeof(value) === "string") {
            if (value.startsWith("0x")) {
                return value.replace("0x", "");
            }

            return new BigNumber(value, 10).toString(16);
        }

        return value.toString(16);
    }

    function _prepend_padding(value, digits) {
        return _padding_string.substring(0, digits - value.length) + value;
    }

    function _append_padding(value, digits) {
        return value + _padding_string.substring(0, digits - value.length);
    }

    return {
        "uint256": {
            encode: (value) => {
                const hex = _value_to_hex(value);
                
                return _prepend_padding(hex, 64);
            },

            decode: (value) => {
                const hex = value.substring(0, 64).replace(/^0+/, "");

                return  [ new BigNumber(hex, 16), 64 ];
            },

            is_dynamic: () => {
                return false;
            }
        },

        "uint32": {
            encode: (value) => {
                const hex = _value_to_hex(value);
                
                return _prepend_padding(hex, 64);
            },

            decode: (value) => {
                const hex = value.substring(0, 64).replace(/^0+/, "");
                
                return [ new BigNumber(hex, 16), 64 ];
            },

            is_dynamic: () => {
                return false;
            }
        },

        "uint8": {
            encode: (value) => {
                const hex = _value_to_hex(value);
                
                return _prepend_padding(hex, 64);
            },

            decode: (value) => {
                const hex = value.substring(0, 64).replace(/^0+/, "");
                
                return [ parseInt(hex, 16), 64 ];
            },

            is_dynamic: () => {
                return false;
            }
        },

        "address": {
            encode: (value) => {
                const hex = _value_to_hex(value);
                
                return _prepend_padding(hex, 64);
            },

            decode: (value) => {
                const address = "0x" + value.substring(24, 64);
                
                return [ address, 64 ];
            },

            is_dynamic: () => {
                return false;
            }
        },

        "bool": {
            encode: (value) => {
                const hex = value ? "1" : "0";

                return _prepend_padding(hex, 64);
            },

            decode: (value) => {
                const bool = parseInt(value.substring(63)) ? true : false;

                return [ bool, 64 ];
            },

            is_dynamic: () => {
                return false;
            }
        },

        "string": {
            encode: (value) => {

            },

            decode: (value) => {
                const length = parseInt(value.substring(0, 64).replace(/^0+/, ""), 16);
                const bytes = new Uint8Array(length);

                for (let i = 0; i < length; ++i) {
                    const hex = value.substring(64 + i * 2, 64 + (i + 1) * 2);

                    bytes[i] = parseInt(hex, 16);
                }

                return [ encode("string", bytes), 64 + Math.ceil(length / 32) * 64 ];
            },

            is_dynamic: () => {
                return true;
            }
        },

        "bytes32": {
            encode: (value) => {

            },

            decode: (value) => {

            },

            is_dynamic: () => {
                return true;
            }
        },
    }
})();

__MODULE__ = module;
