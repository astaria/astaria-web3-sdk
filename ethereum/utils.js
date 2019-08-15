EthereumUtils = (function() {
    return {};
})();

include("./bignumber.js");

EthereumUtils.__unit_map = {
    'noether':      '0',
    'wei':          '1',
    'kwei':         '1000',
    'Kwei':         '1000',
    'babbage':      '1000',
    'femtoether':   '1000',
    'mwei':         '1000000',
    'Mwei':         '1000000',
    'lovelace':     '1000000',
    'picoether':    '1000000',
    'gwei':         '1000000000',
    'Gwei':         '1000000000',
    'shannon':      '1000000000',
    'nanoether':    '1000000000',
    'nano':         '1000000000',
    'szabo':        '1000000000000',
    'microether':   '1000000000000',
    'micro':        '1000000000000',
    'finney':       '1000000000000000',
    'milliether':   '1000000000000000',
    'milli':        '1000000000000000',
    'ether':        '1000000000000000000',
    'kether':       '1000000000000000000000',
    'grand':        '1000000000000000000000',
    'mether':       '1000000000000000000000000',
    'gether':       '1000000000000000000000000000',
    'tether':       '1000000000000000000000000000000',
};

EthereumUtils.__max_digits = "0000000000000000000000000000000000000000000000000000000000000000";

EthereumUtils.value_to_wei = function(value, unit) {
    var number = EthereumUtils.value_to_number(value);
    var value_of_unit = EthereumUtils.__get_value_of_unit(unit);

    return number.times(value_of_unit);
}

EthereumUtils.wei_to_number = function(wei, unit) {
    var value_of_unit = EthereumUtils.__get_value_of_unit(unit);

    return wei.dividedBy(value_of_unit);
}

EthereumUtils.number_to_hex = function(number, digits) {
    var hex = number.toString(16);

    if (digits) {
        hex = EthereumUtils.__max_digits.substring(0, digits - hex.length) + hex;
    }

    return '0x' + hex;
}

EthereumUtils.value_to_number = function(value) {
    if (value instanceof BigNumber) {
        return value;
    }

    if (typeof value === 'string') {
        return new BigNumber(value.replace('0x', ''), 16);
    }

    return new BigNumber(value, 10);
}

EthereumUtils.__get_value_of_unit = function(unit) {
    return new BigNumber(EthereumUtils.__unit_map[unit], 10);
}

__MODULE__ = EthereumUtils;
