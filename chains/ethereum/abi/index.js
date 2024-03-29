const module = (function() {
    const crypto = __ETHEREUM__.crypto,
          types = require("./types");

    function _encode_signature(definition) {
        const bits = crypto.string_to_bits(definition);
        const hash = crypto.keccak256.digest(bits);

        return crypto.hex_from_bits(crypto.bits_slice(hash, 0, 32));
    }

    function _encode_tuple(tuple, values) {
        let head = "", tail = "";

        tuple.forEach((type, i) => {
            if (type.endsWith("[]")) {
                head += types["uint256"].encode(32 * tuple.length + tail.length / 2);
                tail += _encode_array(type.replace(/\[\]$/, ""), values[i]);
            } else {
                head += types[type].encode(values[i]);
            }
        });

        return head + tail;
    }

    function _encode_array(type, value) {
        let string = types["uint256"].encode(value.length);

        if (type.endsWith("[]") || types[type].is_dynamic()) {
            for (let i = 0; i < value.length; ++i) {
                // TODO
            }    
        } else {
            for (let i = 0; i < value.length; ++i) {
                string += types[type].encode(value[i]);
            }
        }

        return string;
    }

    function _decode_tuple(tuple, string) {
        const values = [];
        let offset = 0, end_offset = 0;

        tuple.forEach((type) => {
            if (type.endsWith("[]")) {
                const tail_offset = types["uint256"].decode(string.substring(offset, offset + 64))[0] * 2;
                const [ value, next_offset ] = _decode_array(type.replace(/\[\]$/, ""), string.substring(tail_offset));
                
                values.push(value);

                end_offset = offset + next_offset;
            } else {
                if (types[type].is_dynamic()) {
                    const tail_offset = types["uint256"].decode(string.substring(offset, offset + 64))[0] * 2;
                    const [ value, next_offset ] = types[type].decode(string.substring(tail_offset));

                    values.push(value);

                    end_offset = tail_offset + next_offset;
                } else {
                    values.push(types[type].decode(string.substring(offset, offset + 64))[0]);
                }
            }

            offset += 64;
        });

        if (end_offset === 0) {
            end_offset = offset;
        }

        return [ values, end_offset ];
    }

    function _decode_array(type, string) {
        const [ count, offset ] = types["uint256"].decode(string.substring(0, 64));
        const values = []
        let end_offset = 0;

        if (type.endsWith("[]")) {
            for (let i = 0; i < count; ++i) {
                const tail_offset = 64 + types["uint256"].decode(string.substring(offset, offset + 64))[0] * 2;
                const [ value, next_offset ] = _decode_array(type.replace(/\[\]$/, ""), string.substring(tail_offset));

                values.push(value);

                end_offset = tail_offset + next_offset;
                offset += 64;
            }
        } else {
            if (types[type].is_dynamic()) {
                for (let i = 0; i < count; ++i) {
                    const tail_offset = 64 + types["uint256"].decode(string.substring(offset, offset + 64))[0] * 2;
                    const [ value, next_offset ] = types[type].decode(string.substring(tail_offset));
    
                    values.push(value);
    
                    end_offset = tail_offset + next_offset;
                    offset += 64;
                }
            } else {
                for (let i = 0; i < count; ++i) {
                    values.push(types[type].decode(string.substring(offset, offset + 64))[0]);
    
                    offset += 64;
                }
            }
        }

        if (end_offset === 0) {
            end_offset = offset;
        }

        return [ values, end_offset ];
    }

    return {
        encode: function(definition, values) {
            const m = definition.match(/(.*)\((.*)\)/);

            if (m) {
                return "0x" + [
                    m[1] ? _encode_signature(definition) : "",
                    m[2] ? _encode_tuple(m[2].split(","), values) : []
                ].join("");
            }
        },

        decode: function(definition, string) {
            const m = definition.match(/(.*)\((.*)\)/);

            if (m && m[2]) {
                return _decode_tuple(m[2].split(","), string.replace(/^0x/, ""))[0];
            }
        },
    }
})();

__MODULE__ = module;
