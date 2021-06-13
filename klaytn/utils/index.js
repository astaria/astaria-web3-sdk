var module = (function() {
    include("utils/bignumber.js");

    const _max_digits = "0000000000000000000000000000000000000000000000000000000000000000";
    const _unit_map = {
        'peb':   '1',
        'kpeb':  '1000',
        'Mpeb':  '1000000',
        'Gpeb':  '1000000000',
        'Ston':  '1000000000',
        'uKLAY': '1000000000000',
        'mKLAY': '1000000000000000',
        'KLAY':  '1000000000000000000',
        'kKLAY': '1000000000000000000000',
        'MKLAY': '1000000000000000000000000',
        'GKLAY': '1000000000000000000000000000',
        'TKLAY': '1000000000000000000000000000000',
    };

    function _get_value_of_unit(unit) {
        return new BigNumber(_unit_map[unit], 10);
    }

    return {
        value_to_wei: function(value, unit) {
            var number = this.value_to_number(value);
            var value_of_unit = _get_value_of_unit(unit);
        
            return number.times(value_of_unit);
        },
        
        wei_to_number: function(wei, unit) {
            var value_of_unit = _get_value_of_unit(unit);
        
            return wei.dividedBy(value_of_unit);
        },
        
        number_to_hex: function(number, digits) {
            var hex = number.toString(16);
        
            if (digits) {
                hex = _max_digits.substring(0, digits - hex.length) + hex;
            }
        
            return '0x' + hex;
        },
        
        value_to_number: function(value) {
            if (value instanceof BigNumber) {
                return value;
            }
        
            if (typeof value === 'string') {
                return new BigNumber(value.replace('0x', ''), 16);
            }
        
            return new BigNumber(value, 10);
        },        
    }
})();

__MODULE__ = module;
