var module = (function() {
    return {
        vote: {
            voter: "string",
            author: "string",
            permlink: "string",
            weight: "int16"
        },
        
        comment: {
            parent_author: "string",
            parent_permlink: "string",
            author: "string",
            permlink: "string",
            title: "string",
            body: "string",
            json_metadata: "string"
        },

        transfer: {
            from: "string",
            to: "string",
            amount: "asset",
            memo: "string"
        },

        transfer_to_vesting: {
            from: "string",
            to: "string",
            amount: "asset"
        },

        withdraw_vesting: {
            account: "string",
            vesting_shares: "asset"
        },
        
        account_create: {
            fee: "asset",
            creator: "string",
            new_account_name: "string",
            owner: "authority",
            active: "authority",
            posting: "authority",
            memo_key: "public_key",
            json_metadata: "string"
        },

        delete_comment: {
            author: "string",
            permlink: "string"
        },

        custom_json: {
            required_auths: [ "array", "string" ],
            required_posting_auths: [ "array", "string" ],
            id: "string",
            json: "string"
        },

        comment_options: {
            author: "string",
            permlink: "string",
            max_accepted_payout: "asset",
            percent_steem_dollars: "uint16",
            allow_votes: "bool",
            allow_curation_rewards: "bool",
            extensions: [ "array", "beneficiaries" ]
        },

        delegate_vesting_shares: {
            delegator: "string",
            delegatee: "string",
            vesting_shares: "asset"
        },

        escrow_transfer: {
            from: "string",
            to: "string",
            agent: "string",
            escrow_id: "unit32",
            sbd_amount: "asset",
            steem_amount: "asset",
            fee: "asset",
            ratification_deadline: "string",
            escrow_expiration: "string",
            json_metadata: "string"
        },

        escrow_dispute: {
            from: "string",
            to: "string",
            agent: "string",
            who: "string",
            escrow_id: "unit32"
        },

        escrow_release: {
            from: "string",
            to: "string",
            agent: "string",
            who: "string",
            receiver: "string",
            escrow_id: "unit32",
            sbd_amount: "asset",
            steem_amount: "asset"
        },
        
        escrow_approve: {
            from: "string",
            to: "string",
            agent: "string",
            who: "string",
            escrow_id: "unit32",
            approve: "string"
        },

        claim_reward_balance: {
            account: "string",
            reward_steem: "asset",
            reward_sbd: "asset",
            reward_vests: "asset"
        }
    }
})();

__MODULE__ = module;
