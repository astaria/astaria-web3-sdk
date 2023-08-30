const module = (() => {
    const broadcast = __STEEM__.broadcast, 
          struct = __STEEM__.struct;

    return {
        serialize_transaction: (transaction) => {
            var buffer = [];
            
            this.pack_buffer(buffer, "<H", [ transaction["ref_block_num"] ]);
            this.pack_buffer(buffer, "<I", [ transaction["ref_block_prefix"] ]);
            this.pack_buffer(buffer, "<I", [ new Date(transaction["expiration"] + 'Z').getTime() / 1000 ]);
        
            this.pack_buffer(buffer, "B", [ transaction["operations"].length ]);
            transaction["operations"].forEach((operation) => {
                var params = operation[1];
        
                broadcast.find_operation(operation[0], (index, operation) => {
                    this.pack_buffer(buffer, "B", [ index ]);
        
                    operation["params"].forEach((param) => {
                        var serializer = params[operation.operation][param];
        
                        if (serializer instanceof Array) {
                            serializer[0].pack(buffer, params[param], serializer[1]);
                        } else {
                            serializer.pack(buffer, params[param]);
                        }
                    });
                });
            });
        
            this.pack_buffer(buffer, "B", [ transaction["extensions"].length ]);
            transaction["extensions"].forEach((extension) => {
                // TBD
            });
        
            return buffer;
        },
        
        pack_buffer: (buffer, format, values) => {
            struct.pack(format, values).forEach((byte) => {
                buffer.push(byte);
            });
        },
        
        pack_buffer_varint32: (buffer, value) => {
            value >>>= 0;
        
            while (value >= 0x80) {
                this.pack_buffer(buffer, "B", [ (value & 0x7f) | 0x80 ]);
                value >>>= 7;
            }
            
            this.pack_buffer(buffer, "B", [ value ]);
        },

        string_source: (string) => {
            var i = 0; 
        
            return () => {
                return i < string.length ? string.charCodeAt(i++) : null;
            };
        },
    }
})();


__MODULE__ = module;
