const module = (function() {
    function _encode(data) {
        if (data instanceof Array) {
            return _encode_array(data);
        }
    
        return _encode_string(data, 128);
    }
    
    function _encode_array(array) {
        const data = [];
    
        array.forEach((item) => {
            data.push(_encode(item));
        });
    
        return _encode_string(data.join(""), 192);
    }
    
    function _encode_string(string, offset) {
        if (string.length == 1 && string.charCodeAt(0) < 128) {
            return string;
        }
    
        return _encode_length(string.length, offset) + string;
    }
    
    function _encode_length(length, offset) {
        if (length > 55) {
            const bl = _to_binary(length);
    
            return String.fromCharCode(bl.length + offset + 55) + bl;
        }
    
        return String.fromCharCode(length + offset);
    }
    
    function _to_binary(x) {
        if (x != 0) {
            return _to_binary(parseInt(x / 256)) + String.fromCharCode(x % 256);
        }
    
        return "";
    }

    return {
        encode: function(data) {
            return _encode(data);
        },
    }
})();

__MODULE__ = module;
