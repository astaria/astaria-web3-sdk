const module = (() => {
    const encoder = include("./encoder.js");

    return {
        serialize_transaction: (transaction, for_signature) => {
            if (transaction["type"] === "ACCOUNT_UPDATE") {
                return encoder.encode_for_account_update(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_ACCOUNT_UPDATE") {
                return encoder.encode_for_fee_delegated_account_update(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO") {
                return encoder.encode_for_fee_delegated_account_update_with_ratio(transaction, for_signature);
            }
    
            if (transaction["type"] === "VALUE_TRANSFER") {
                return encoder.encode_for_value_transfer(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_VALUE_TRANSFER") {
                return encoder.encode_for_fee_delegated_value_transfer(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO") {
                return encoder.encode_for_fee_delegated_value_transfer_with_ratio(transaction, for_signature);
            }
    
            if (transaction["type"] === "VALUE_TRANSFER_MEMO") {
                return encoder.encode_for_value_transfer_memo(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_VALUE_TRANSFER_MEMO") {
                return encoder.encode_for_fee_delegated_value_transfer_memo(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO") {
                return encoder.encode_for_fee_delegated_value_transfer_memo_with_ratio(transaction, for_signature);
            }
    
            if (transaction["type"] === "SMART_CONTRACT_DEPLOY") {
                return encoder.encode_for_smart_contract_deploy(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_SMART_CONTRACT_DEPLOY") {
                return encoder.encode_for_fee_delegated_smart_contract_deploy(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO") {
                return encoder.encode_for_fee_delegated_smart_contract_deploy_with_ratio(transaction, for_signature);
            }
    
            if (transaction["type"] === "SMART_CONTRACT_EXECUTION") {
                return encoder.encode_for_smart_contract_execution(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_SMART_CONTRACT_EXECUTION") {
                return encoder.encode_for_fee_delegated_smart_contract_execution(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO") {
                return encoder.encode_for_fee_delegated_smart_contract_execution_with_ratio(transaction, for_signature);
            }
    
            if (transaction["type"] === "CANCEL") {
                return encoder.encode_for_cancel(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_CANCEL") {
                return encoder.encode_for_fee_delegated_cancel(transaction, for_signature);
            }
    
            if (transaction["type"] === "FEE_DELEGATED_CANCEL_WITH_RATIO") {
                return encoder.encode_for_fee_delegated_cancel_with_ratio(transaction, for_signature);
            }
    
            if (transaction["type"] === "CHAIN_DATA_ANCHORING") {
                return encoder.encode_for_chain_data_anchoring(transaction, for_signature);
            }
    
            return encoder.encode_for_legacy(transaction, for_signature);
        },
    }
})();

__MODULE__ = module;
