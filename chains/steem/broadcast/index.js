const module = (function() {
    const auth = __STEEM__.auth,
          struct = __STEEM__.struct,
          operations = include("./operations.js"), 
          serializer = include("./serializer.js");

    function _send_transaction(api, operation, keys) {
        return new Promise(function(resolve, reject) {
            const transaction = {};
    
            transaction["operations"] = [ operation ];
            transaction["extensions"] = [];
    
            _prepare_transaction(api, transaction)
                .then(function(transaction) {
                    const signatures = _sign_transaction(transaction, keys);
                    
                    transaction["signatures"] = signatures;
    
                    api.broadcast_transaction_synchronous(transaction)
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }
        
    function _prepare_transaction(api, transaction) {
        return api.get_dynamic_global_properties()
            .then(function(properties) {
                const ref_block_num = (properties.last_irreversible_block_num - 1) & 0xFFFF;
                const current_date = new Date(properties.time + 'Z');
                const expired_date = new Date(current_date.getTime() + 600 * 1000);
                const expiration = expired_date.toISOString().substring(0, 19);
    
                return api.get_block(properties.last_irreversible_block_num)
                    .then(function(block) {
                        const head_block_id = decode("hex", block.previous);
                        const ref_block_prefix = struct.unpack("<I", head_block_id, 4)[0];
    
                        transaction["ref_block_num"]    = ref_block_num;
                        transaction["ref_block_prefix"] = ref_block_prefix;
                        transaction["expiration"]       = expiration;
    
                        return Promise.resolve(transaction);
                    });
                });
    }
    
    function _sign_transaction(transaction, keys) {
        const message = serializer.serialize_transaction(transaction);
        const signatures = auth.sign_message(message, keys);
    
        return signatures;
    }

    return {
        create: function(api) {
            return {
                vote: function(voter, author, permlink, weight, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "vote", { 
                            voter:voter, author:author, permlink:permlink, weight:weight
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                comment: function(parent_author, parent_permlink, author, permlink, title, body, json_metadata, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "comment", { 
                            parent_author:parent_author, parent_permlink:parent_permlink,
                            author:author, permlink:permlink, title:title, body:body, json_metadata:json_metadata
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                transfer: function(from, to, amount, memo, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "transfer", { 
                            from:from, to:to, amount:amount, memo:memo
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                transfer_to_vesting: function(from, to, amount, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "transfer_to_vesting", { 
                            from:from, to:to, amount:amount
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                withdraw_vesting: function(account, vesting_shares, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "withdraw_vesting", { 
                            account:account, vesting_shares:vesting_shares
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                account_create: function(fee, creator, new_account_name, owner, active, posting, memo_key, json_metadata, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "account_create", { 
                            fee:fee, creator:creator, new_account_name:new_account_name, 
                            owner:owner, active:active, posting:posting, memo_key:memo_key, 
                            json_metadata:json_metadata
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                account_witness_vote: function(account, witness, approve, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "account_witness_vote", { 
                            account:account, witness:witness, approve:approve
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                account_witness_proxy: function(account, proxy, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "account_witness_proxy", { 
                            account:account, proxy:proxy
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                delete_comment: function(author, permlink, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "delete_comment", { 
                            author:author, permlink:permlink
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                custom_json: function(required_auths, required_posting_auths, id, json, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "custom_json", { 
                            required_auths:required_auths, required_posting_auths:required_posting_auths, id:id, json:json
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                comment_options: function(author, permlink, max_accepted_payout, percent_steem_dollars, allow_votes, allow_curation_rewards, extensions, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "comment_options", { 
                            author:author, permlink:permlink, max_accepted_payout:max_accepted_payout, 
                            percent_steem_dollars:percent_steem_dollars, allow_votes:allow_votes, 
                            allow_curation_rewards:allow_curation_rewards, extensions:extensions
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                delegate_vesting_shares: function(delegator, delegatee, vesting_shares, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "delegate_vesting_shares", { 
                            delegator:delegator, delegatee:delegatee, vesting_shares:vesting_shares
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                escrow_transfer: function(from, to, agent, escrow_id, sbd_amount, steem_amount, fee, ratification_deadline, escrow_expiration, json_meta, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "escrow_transfer", { 
                            from:from, to:to, agent:agent, escrow_id:escrow_id, sbd_amount:sbd_amount, steem_amount:steem_amount, fee:fee,
                            ratification_deadline:ratification_deadline, escrow_expiration:escrow_expiration, json_meta:json_meta
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                escrow_dispute: function(from, to, agent, who, escrow_id, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "escrow_dispute", { 
                            from:from, to:to, agent:agent, who:who, escrow_id:escrow_id
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                escrow_release: function(from, to, agent, who, receiver, escrow_id, sbd_amount, steem_amount, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "escrow_release", { 
                            from:from, to:to, agent:agent, who:who, receiver:receiver, escrow_id:escrow_id,
                            sbd_amount:sbd_amount, steem_amount:steem_amount
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                escrow_approve: function(from, to, agent, who, escrow_id, approve, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "escrow_approve", { 
                            from:from, to:to, agent:agent, who:who, escrow_id:escrow_id, approve:approve
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                claim_reward_balance: function(account, reward_steem, reward_sbd, reward_vests, keys) {
                    return new Promise(function(resolve, reject) {
                        const operation = [ "claim_reward_balance", { 
                            account:account, reward_steem:reward_steem, reward_sbd:reward_sbd, reward_vests:reward_vests
                        }];
                
                        _send_transaction(api, operation, keys)
                            .then(function(response) {
                                resolve(response);
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                },
                
                find_operation: function(name, handler) {
                    for (let index = 0; index < operations.length; index++) {
                        const operation = operations[index];
            
                        if (operation.operation === name) {
                            handler(index, operation);
                            
                            break;
                        }
                    }
                },
            }
        }
    }
})();

__MODULE__ = module;
