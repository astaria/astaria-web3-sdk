RLP = (function() {
    return {};
})();

RLP.encode = function(data) {
    return RLP.__encode(data);
}

RLP.__encode = function(data) {
    if (data instanceof Array) {
        return RLP.__encode_array(data);
    }

    return RLP.__encode_string(data, 128);
}

RLP.__encode_array = function(array) {
    var data = [];

    array.forEach(function(item) {
        data.push(RLP.__encode(item));
    });

    return RLP.__encode_string(data.join(""), 192);
}

RLP.__encode_string = function(string, offset) {
    if (string.length == 1 && string.charCodeAt(0) < 128) {
        return string;
    }

    return RLP.__encode_length(string.length, offset) + string;
}

RLP.__encode_length = function(length, offset) {
    if (length > 55) {
        var bl = RLP.__to_binary(length);

        return String.fromCharCode(bl.length + offset + 55) + bl;
    }

    return String.fromCharCode(length + offset);
}

RLP.__to_binary = function(x) {
    if (x != 0) {
        return RLP.__to_binary(parseInt(x / 256)) + String.fromCharCode(x % 256);
    }

    return "";
}

__MODULE__ = RLP;
