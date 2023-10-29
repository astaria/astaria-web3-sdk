const module = (function() {
    const jspack = require("./jspack");

    return {
        pack: function(format, values) {
            return jspack.Pack(format, values);
        },
        
        unpack: function(format, bytes, offset) {
            return jspack.Unpack(format, bytes, offset);
        },
    }
})();

__MODULE__ = module;
