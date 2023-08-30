const module = (() => {
    const auth = __STEEM__.auth, 
          utfx = __STEEM__.utfx, 
          serializer = include("./serializer.js");

    return {
        "string": {
            pack: (buffer, value) => {
                var length = utfx.calculateUTF16asUTF8(serializer.string_source(value))[1];
                serializer.pack_buffer_varint32(buffer, length);
    
                utfx.encodeUTF16toUTF8(serializer.string_source(value), (c) => {
                    serializer.pack_buffer(buffer, "c", [ String.fromCharCode(c) ]);
                });
            },
    
            unpack: (buffer) => {
    
            }
        }, 
    
        "uint16": {
            pack: (buffer, value) => {
                serializer.pack_buffer(buffer, "<H", [ value ]);
            },
    
            unpack: (buffer) => {
    
            }
        }, 
    
        "int16": {
            pack: (buffer, value) => {
                serializer.pack_buffer(buffer, "<h", [ value ]);
            },
    
            unpack: (buffer) => {
    
            }
        },
    
        "unit32": {
            pack: (buffer, value) => {
                serializer.pack_buffer(buffer, "<I", [ value ]);
            },
    
            unpack: (buffer) => {
    
            }
        },
    
        "int32": {
            pack: (buffer, value) => {
                serializer.pack_buffer(buffer, "<i", [ value ]);
            },
    
            unpack: (buffer) => {
    
            }
        }, 
    
        "unit64": {
            pack: (buffer, value) => {
    
            },
    
            unpack: (buffer) => {
    
            }
        }, 
    
        "int64": {
            pack: (buffer, value) => {
    
            },
            unpack: (buffer) => {
    
            }
        },
    
        "bool": {
            pack: (buffer, value) => {
                serializer.pack_buffer(buffer, "B", [ JSON.parse(value) ? 1: 0 ]);
            },
            unpack: (buffer) => {
    
            }
        },
    
        "public_key": {
            pack: (buffer, value) => {
                auth.decode_address(value).forEach((byte) => {
                    serializer.pack_buffer(buffer, "B", [ byte ]);
                });
            },
            unpack: (buffer) => {
    
            }
        },
    
        "asset": {
            pack: (buffer, value) => {
                var tokens = value.split(" ");
                var amount = parseLong(tokens[0].replace(".", "")); // * 1000
                var dot = tokens[0].indexOf("."); // 0.000
                var precision = (dot === -1) ? 0: tokens[0].length - dot - 1;
                var symbol = tokens[1];
                var amount_high, amount_low;
    
                amount_low  = amount[1] - amount[0];
                amount_high = amount[0] - ((amount_low < 0) ? 1: 0);
    
                serializer.pack_buffer(buffer, (amount_low > 0) ? "<I<i": "<i<i", [ amount_low, amount_high ]);
                serializer.pack_buffer(buffer, "B", [ precision ]);
                serializer.pack_buffer(buffer, symbol.length + "s", [ symbol ]);
    
                for (var i = 0; i < 7 - symbol.length; i++) {
                    serializer.pack_buffer(buffer, "B", [ 0 ]);
                }
            },
    
            unpack: (buffer) => {
    
            }
        },
    
        "authority": {
            pack: (buffer, value) => {
                serializer.pack_buffer(buffer, "<I", [ value["weight_threshold"] ]);
    
                serializer.pack_buffer(buffer, "B", [ value["account_auths"].length ]);
                value["account_auths"].forEach((auth) => {
                    // TBD
                });
    
                serializer.pack_buffer(buffer, "B", [ value["key_auths"].length ]);
                value["key_auths"].forEach((auth) => {
                    auth.decode_address(auth[0]).forEach((byte) => {
                        serializer.pack_buffer(buffer, "B", [ byte ]);
                    });
                    serializer.pack_buffer(buffer, "<H", [ auth[1] ]);
                });
            },
    
            unpack: (buffer) => {
    
            }
        },
    
        "beneficiaries": {
            pack: (buffer, value) => {
                serializer.pack_buffer_varint32(buffer, value[0]);
                serializer.pack_buffer_varint32(buffer, value[1]["beneficiaries"].length);
    
                value[1]["beneficiaries"].forEach((value) => {
                    serializer.pack_buffer(buffer, "B", [ value["account"].length ]);
                    serializer.pack_buffer(buffer, value["account"].length + "s", [ value["account"] ]);
                    serializer.pack_buffer(buffer, "<H", [ value["weight"] ]);
                });
            },
    
            unpack: (buffer) => {
    
            }
        },
    
        "array": {
            pack: (buffer, value, serializer) => {
                serializer.pack_buffer_varint32(buffer, value.length);
                value.forEach((item) => {
                    serializer.pack(buffer, item);
                });
            },
    
            unpack: (buffer) => {
    
            }
        },
    }
})();

__MODULE__ = module;
