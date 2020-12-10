var module = (function() {
    const auth       = Steem.auth,
          operations = include("./operations.js");
          params     = include("./params.js"),
          struct     = require("struct"),
          utfx       = require("utfx");

    function _find_operation(name, handler) {
        for (var index = 0; index < operations.length; index++) {
            var operation = operations[index];
            if (operation.operation === name) {
                handler(index, operation);
                
                break;
            }
        }
    }
    
    function _pack_buffer_varint32(buffer, value) {
        value >>>= 0;
    
        while (value >= 0x80) {
            _pack_buffer(buffer, "B", [ (value & 0x7f) | 0x80 ]);
            value >>>= 7;
        }
        
        _pack_buffer(buffer, "B", [ value ]);
    }
    
    function _pack_buffer(buffer, format, values) {
        struct.pack(format, values).forEach(function(byte) {
            buffer.push(byte);
        });
    }
    
    function _stringSource(string) {
        var i = 0;
    
        return function() {
            return i < string.length ? string.charCodeAt(i++): null;
        };
    }

    function _find_operation(name, handler) {
        for (var index = 0; index < operations.length; index++) {
            var operation = operations[index];
            if (operation.operation === name) {
                handler(index, operation);
                
                break;
            }
        }    
    }

    function _pack_buffer_varint32(buffer, value) {
        value >>>= 0;

        while (value >= 0x80) {
            _pack_buffer(buffer, "B", [ (value & 0x7f) | 0x80 ]);
            value >>>= 7;
        }
        
        _pack_buffer(buffer, "B", [ value ]);
    }

    function _pack_buffer(buffer, format, values) {
        struct.pack(format, values).forEach(function(byte) {
            buffer.push(byte);
        });
    }

    function _stringSource(string) {
        var i = 0; 

        return function() {
            return i < string.length ? string.charCodeAt(i++): null;
        };
    }
    
    const _serializers = {
        string: {
            pack: function(buffer, value) {
                var length = utfx.calculateUTF16asUTF8(_stringSource(value))[1];
                _pack_buffer_varint32(buffer, length);
    
                utfx.encodeUTF16toUTF8(_stringSource(value), function(c) {
                    _pack_buffer(buffer, "c", [ String.fromCharCode(c) ]);
                });
            },
            unpack: function(buffer) {
    
            }
        }, 
        
        uint16: {
            pack: function(buffer, value) {
                _pack_buffer(buffer, "<H", [ value ]);
            },
            unpack: function(buffer) {
    
            }
        }, 
    
        int16: {
            pack: function(buffer, value) {
                _pack_buffer(buffer, "<h", [ value ]);
            },
            unpack: function(buffer) {
    
            }
        },
        
        unit32: {
            pack: function(buffer, value) {
                _pack_buffer(buffer, "<I", [ value ]);
            },
            unpack: function(buffer) {
    
            }
        },
    
        int32: {
            pack: function(buffer, value) {
                _pack_buffer(buffer, "<i", [ value ]);
            },
            unpack: function(buffer) {
    
            }
        }, 
    
        unit64: {
            pack: function(buffer, value) {
    
            },
            unpack: function(buffer) {
    
            }
        }, 
    
        int64: {
            pack: function(buffer, value) {
    
            },
            unpack: function(buffer) {
    
            }
        },
    
        bool: {
            pack: function(buffer, value) {
                _pack_buffer(buffer, "B", [ JSON.parse(value) ? 1: 0 ]);
            },
            unpack: function(buffer) {
    
            }
        },
    
        public_key: {
            pack: function(buffer, value) {
                auth.decode_public_key(value).forEach(function(byte) {
                    _pack_buffer(buffer, "B", [ byte ]);
                });
            },
            unpack: function(buffer) {
    
            }
        },
    
        asset: {
            pack: function(buffer, value) {
                var tokens = value.split(" ");
                var amount = parseLong(tokens[0].replace(".", "")); // * 1000
                var dot = tokens[0].indexOf("."); // 0.000
                var precision = (dot === -1) ? 0: tokens[0].length - dot - 1;
                var symbol = tokens[1];
                var amount_high, amount_low;
    
                amount_low  = amount[1] - amount[0];
                amount_high = amount[0] - ((amount_low < 0) ? 1: 0);
    
                _pack_buffer(buffer, (amount_low > 0) ? "<I<i": "<i<i", [ amount_low, amount_high ]);
                _pack_buffer(buffer, "B", [ precision ]);
                _pack_buffer(buffer, symbol.length + "s", [ symbol ]);
    
                for (var i = 0; i < 7 - symbol.length; i++) {
                    _pack_buffer(buffer, "B", [ 0 ]);
                }
            },
            unpack: function(buffer) {
    
            }
        },
    
        authority: {
            pack: function(buffer, value) {
                _pack_buffer(buffer, "<I", [ value["weight_threshold"] ]);
    
                _pack_buffer(buffer, "B", [ value["account_auths"].length ]);
                value["account_auths"].forEach(function(auth) {
                    // TBD
                });
    
                _pack_buffer(buffer, "B", [ value["key_auths"].length ]);
                value["key_auths"].forEach(function(auth) {
                    auth.decode_public_key(auth[0]).forEach(function(byte) {
                        _pack_buffer(buffer, "B", [ byte ]);
                    });
                    _pack_buffer(buffer, "<H", [ auth[1] ]);
                });
            },
            unpack: function(buffer) {
    
            }
        },
    
        beneficiaries: {
            pack: function(buffer, value) {
                _pack_buffer_varint32(buffer, value[0]);
                _pack_buffer_varint32(buffer, value[1]["beneficiaries"].length);
    
                value[1]["beneficiaries"].forEach(function(value) {
                    _pack_buffer(buffer, "B", [ value["account"].length ]);
                    _pack_buffer(buffer, value["account"].length + "s", [ value["account"] ]);
                    _pack_buffer(buffer, "<H", [ value["weight"] ]);
                });
            },
            unpack: function(buffer) {
    
            }
        },
    
        array: {
            pack: function(buffer, value, serializer) {
                _pack_buffer_varint32(buffer, value.length);
                value.forEach(function(item) {
                    serializer.pack(buffer, item);
                });
            },
            unpack: function(buffer) {
    
            }
        }
    }

    return {
        serialize_transaction: function(transaction) {
            var buffer = [];
            
            _pack_buffer(buffer, "<H", [ transaction["ref_block_num"] ]);
            _pack_buffer(buffer, "<I", [ transaction["ref_block_prefix"] ]);
            _pack_buffer(buffer, "<I", [ new Date(transaction["expiration"] + 'Z').getTime() / 1000 ]);
        
            _pack_buffer(buffer, "B", [ transaction["operations"].length ]);
            transaction["operations"].forEach(function(operation) {
                var params = operation[1];
        
                _find_operation(operation[0], function(index, operation) {
                    _pack_buffer(buffer, "B", [ index ]);
        
                    operation["params"].forEach(function(param) {
                        var serializer = params[operation.operation][param];
        
                        if (serializer instanceof Array) {
                            _serializers[serializer[0]].pack(buffer, params[param], _serializers[serializer[1]]);
                        } else {
                            _serializers[serializer].pack(buffer, params[param]);
                        }
                    });
                });
            });
        
            _pack_buffer(buffer, "B", [ transaction["extensions"].length ]);
            transaction["extensions"].forEach(function(extension) {
                // TBD
            });
        
            return buffer;
        }, 
    }
})();

__MODULE__ = module;
