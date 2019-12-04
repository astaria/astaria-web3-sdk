SteemNetworks = (function() {
    return {
        MainNet:{ 
            chain_id:"0000000000000000000000000000000000000000000000000000000000000000", 
            pub_prefix:"STM",
            rpc_url:"https://api.steemit.com" 
        },
        TestNet:{ 
            chain_id:"46d82ab7d8db682eb1959aed0ada039a6d49afa1602491f93dde9cac3e8e6c32", 
            pub_prefix:"TST",
            rpc_url:"https://testnet.steemitdev.com" 
        }    
    };
})();

__MODULE__ = SteemNetworks;
