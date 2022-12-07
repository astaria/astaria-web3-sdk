var module = (function() {
    const auth = __STEEM__.auth, 
          utfx = __STEEM__.utfx, 
          serializer = include("./serializer.js");

    return {
        "string": {
            pack: function(buffer, value) {
                var length = utfx.calculateUTF16asUTF8(serializer.string_source(value))[1];
                serializer.pack_buffer_varint32(buffer, length);
    
                utfx.encodeUTF16toUTF8(serializer.string_source(value), function(c) {
                    serializer.pack_buffer(buffer, "c", [ String.fromCharCode(c) ]);
                });
            },
    
            unpack: function(buffer) {
    
            }
        }, 
    
        "uint16": {
            pack: function(buffer, value) {
                serializer.pack_buffer(buffer, "<H", [ value ]);
            },
    
            unpack: function(buffer) {
    
            }
        }, 
    
        "int16": {
            pack: function(buffer, value) {
                serializer.pack_buffer(buffer, "<h", [ value ]);
            },
    
            unpack: function(buffer) {
    
            }
        },
    
        "unit32": {
            pack: function(buffer, value) {
                serializer.pack_buffer(buffer, "<I", [ value ]);
            },
    
            unpack: function(buffer) {
    
            }
        },
    
        "int32": {
            pack: function(buffer, value) {
                serializer.pack_buffer(buffer, "<i", [ value ]);
            },
    
            unpack: function(buffer) {
    
            }
        }, 
    
        "unit64": {
            pack: function(buffer, value) {
    
            },
    
            unpack: function(buffer) {
    
            }
        }, 
    
        "int64": {
            pack: function(buffer, value) {
    
            },
            unpack: function(buffer) {
    
            }
        },
    
        "bool": {
            pack: function(buffer, value) {
                serializer.pack_buffer(buffer, "B", [ JSON.parse(value) ? 1: 0 ]);
            },
            unpack: function(buffer) {
    
            }
        },
    
        "public_key": {
            pack: function(buffer, value) {
                auth.decode_address(value).forEach(function(byte) {
                    serializer.pack_buffer(buffer, "B", [ byte ]);
                });
            },
            unpack: function(buffer) {
    
            }
        },
    
        "asset": {
            pack: function(buffer, value) {
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
    
            unpack: function(buffer) {
    
            }
        },
    
        "authority": {
            pack: function(buffer, value) {
                serializer.pack_buffer(buffer, "<I", [ value["weight_threshold"] ]);
    
                serializer.pack_buffer(buffer, "B", [ value["account_auths"].length ]);
                value["account_auths"].forEach(function(auth) {
                    // TBD
                });
    
                serializer.pack_buffer(buffer, "B", [ value["key_auths"].length ]);
                value["key_auths"].forEach(function(auth) {
                    auth.decode_address(auth[0]).forEach(function(byte) {
                        serializer.pack_buffer(buffer, "B", [ byte ]);
                    });
                    serializer.pack_buffer(buffer, "<H", [ auth[1] ]);
                });
            },
    
            unpack: function(buffer) {
    
            }
        },
    
        "beneficiaries": {
            pack: function(buffer, value) {
                serializer.pack_buffer_varint32(buffer, value[0]);
                serializer.pack_buffer_varint32(buffer, value[1]["beneficiaries"].length);
    
                value[1]["beneficiaries"].forEach(function(value) {
                    serializer.pack_buffer(buffer, "B", [ value["account"].length ]);
                    serializer.pack_buffer(buffer, value["account"].length + "s", [ value["account"] ]);
                    serializer.pack_buffer(buffer, "<H", [ value["weight"] ]);
                });
            },
    
            unpack: function(buffer) {
    
            }
        },
    
        "array": {
            pack: function(buffer, value, serializer) {
                serializer.pack_buffer_varint32(buffer, value.length);
                value.forEach(function(item) {
                    serializer.pack(buffer, item);
                });
            },
    
            unpack: function(buffer) {
    
            }
        },
    }
})();

__MODULE__ = module;
