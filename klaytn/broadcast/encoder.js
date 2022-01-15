var module = (function() {
    const utils = __KLAYTN__.utils,
          rlp = include("./rlp.js");

    function _signatures_to_data(signatures) {
        return signatures.map(function(signature) {
            return signature.map(function(value) {
                return _value_to_data(value);
            });
        });
    }

    function _value_to_data(value) {
        if (value instanceof BigNumber && !value.isZero()) {
            return _hex_to_data(value.toString(16));
        }
        
        if (typeof(value) === 'string' && value.startsWith('0x')) {
            return _hex_to_data(value.replace(/^0x0*/, ''));
        }

        if (typeof(value) === 'number' && value !== 0) {
            return _hex_to_data(value.toString(16));
        }
    
        return "";
    }
    
    function _hex_to_data(hex) {
        var data = "";
    
        hex = ((hex.length % 2) == 1) ? "0" + hex : hex;
    
        for (var i = 0; i < hex.length; i += 2) {
            var char = parseInt(hex.charAt(i), 16) * 16 + parseInt(hex.charAt(i + 1), 16);
    
            data += String.fromCharCode(char);
        }
    
        return data;
    }

    function _data_to_hex(tag, data) {
        var hex = "";
    
        for (var i = 0; i < data.length; ++i) {
            var number = Number(data.charCodeAt(i)).toString(16);
    
            hex += (number.length == 1) ? "0" + number : number;
        }
    
        return (tag || "0x") + hex;
    }

    return {
        encode_for_account_update: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_account_update: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_account_update_with_ratio: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_value_transfer: function(transaction, for_signature) {
            const VALUE_TRANFSER_TYPE_TAG = "0x08";

            if (for_signature) {
                return rlp.encode([
                    rlp.encode([
                        _value_to_data(VALUE_TRANFSER_TYPE_TAG),
                        _value_to_data(transaction["nonce"]),
                        _value_to_data(transaction["gasPrice"]),
                        _value_to_data(transaction["gas"]),
                        _value_to_data(transaction["to"]),
                        _value_to_data(transaction["value"]),
                        _value_to_data(transaction["from"])
                    ]),
                    _value_to_data(transaction["chainId"]),
                    _value_to_data(0),
                    _value_to_data(0)
                ]);    
            } else {
                return _data_to_hex(VALUE_TRANFSER_TYPE_TAG, rlp.encode([
                    _value_to_data(transaction["nonce"]),
                    _value_to_data(transaction["gasPrice"]),
                    _value_to_data(transaction["gas"]),
                    _value_to_data(transaction["to"]),
                    _value_to_data(transaction["value"]),
                    _value_to_data(transaction["from"]),
                    _signatures_to_data(transaction["signatures"])
                ]));
            }
        },
    
        encode_for_value_transfer_memo: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_value_transfer: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_value_transfer_with_ratio: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_value_transfer_memo: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_value_transfer_memo_with_ratio: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_smart_contract_deploy: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_smart_contract_deploy: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_smart_contract_deploy_with_ratio: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_smart_contract_execution: function(transaction, for_signature) {
            const SMART_CONTRACT_EXECUTION_TYPE_TAG = "0x30";

            if (for_signature) {
                return rlp.encode([
                    rlp.encode([
                        _value_to_data(SMART_CONTRACT_EXECUTION_TYPE_TAG),
                        _value_to_data(transaction["nonce"]),
                        _value_to_data(transaction["gasPrice"]),
                        _value_to_data(transaction["gas"]),
                        _value_to_data(transaction["to"]),
                        _value_to_data(transaction["value"] || 0),
                        _value_to_data(transaction["from"]),
                        _value_to_data(transaction["data"])
                    ]),
                    _value_to_data(transaction["chainId"]),
                    _value_to_data(0),
                    _value_to_data(0)
                ]);
            } else {
                return _data_to_hex(SMART_CONTRACT_EXECUTION_TYPE_TAG, rlp.encode([
                    _value_to_data(transaction["nonce"]),
                    _value_to_data(transaction["gasPrice"]),
                    _value_to_data(transaction["gas"]),
                    _value_to_data(transaction["to"]),
                    _value_to_data(transaction["value"] || 0),
                    _value_to_data(transaction["from"]),
                    _value_to_data(transaction["data"]),
                    _signatures_to_data(transaction["signatures"])
                ]));
            }
        },

        encode_for_fee_delegated_smart_contract_execution: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_smart_contract_execution_with_ratio: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_cancel: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_cancel: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_fee_delegated_cancel_with_ratio: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_chain_data_anchoring: function(transaction, for_signature) {
            // TODO
        },
    
        encode_for_legacy: function(transaction, for_signature) {
            if (for_signature) {
                return rlp.encode([
                    _value_to_data(transaction["nonce"]),
                    _value_to_data(transaction["gasPrice"]),
                    _value_to_data(transaction["gas"]),
                    _value_to_data(transaction["to"]),
                    _value_to_data(transaction["value"] || 0),
                    _value_to_data(transaction["data"] || ""),
                    _value_to_data(transaction["chainId"]),
                    _value_to_data(0),
                    _value_to_data(0)
                ]);
            } else {
                return _data_to_hex("", rlp.encode([
                    _value_to_data(transaction["nonce"]),
                    _value_to_data(transaction["gasPrice"]),
                    _value_to_data(transaction["gas"]),
                    _value_to_data(transaction["to"]),
                    _value_to_data(transaction["value"] || 0),
                    _value_to_data(transaction["data"] || ""),
                    _value_to_data(transaction["v"]),
                    _value_to_data(transaction["r"]),
                    _value_to_data(transaction["s"])
                ]));
            }
        },
    }
})();

__MODULE__ = module;
