var module = (function() {
    const jspack = include("./jspack.js");

    return {
        pack: function(format, values) {
            return jspack.Pack(format, values);
        },
        
        unpack: function(format, bytes, offset) {
            return jspack.Unpack(format, bytes, offset);
        },
        
        version: function() {
            return "1.0";
        },
    }
})();

__MODULE__ = module;
