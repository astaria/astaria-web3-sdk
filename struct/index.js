const module = (() => {
    const jspack = include("./jspack.js");

    return {
        pack: (format, values) => {
            return jspack.Pack(format, values);
        },
        
        unpack: (format, bytes, offset) => {
            return jspack.Unpack(format, bytes, offset);
        },
    }
})();

__MODULE__ = module;
