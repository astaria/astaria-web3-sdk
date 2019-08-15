EthereumSerializer = (function() {
    return {};
})();

EthereumSerializer.rlp = include("./rlp.js");

EthereumSerializer.serialize_transaction = function(transaction, format) {
    var buffer = [];

    buffer.push(EthereumSerializer.__number_to_data(transaction["nonce"]));
    buffer.push(EthereumSerializer.__number_to_data(transaction["gasPrice"]));
    buffer.push(EthereumSerializer.__number_to_data(transaction["gasLimit"]));
    buffer.push(EthereumSerializer.__number_to_data(transaction["to"]));
    buffer.push(EthereumSerializer.__number_to_data(transaction["value"] || ""));
    buffer.push(EthereumSerializer.__number_to_data(transaction["data"] || ""));
    buffer.push(EthereumSerializer.__number_to_data(transaction["v"]));
    buffer.push(EthereumSerializer.__number_to_data(transaction["r"]));
    buffer.push(EthereumSerializer.__number_to_data(transaction["s"]));

    transaction = EthereumSerializer.rlp.encode(buffer);
    
    if (format === "hex") {
        transaction = EthereumSerializer.__data_to_hex(transaction);
    }

    return transaction;
}

EthereumSerializer.__number_to_data = function(number) {
    if (number && !number.isZero()) {
        return EthereumSerializer.__hex_to_data(number.toString(16));
    }

    return "";
}

EthereumSerializer.__hex_to_data = function(hex) {
    var data = "";

    hex = ((hex.length % 2) == 1) ? "0" + hex : hex;

    for (var i = 0; i < hex.length; i += 2) {
        var char = parseInt(hex.charAt(i), 16) * 16 + parseInt(hex.charAt(i + 1), 16);

        data += String.fromCharCode(char);
    }

    return data;
}

EthereumSerializer.__data_to_hex = function(data) {
    var hex = "";

    for (var i = 0; i < data.length; ++i) {
        var number = Number(data.charCodeAt(i)).toString(16);

        hex += (number.length == 1) ? "0" + number : number;
    }

    return "0x" + hex;
}

__MODULE__ = EthereumSerializer;
