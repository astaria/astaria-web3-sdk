var module = (function() {
    return {
        MainNet: { 
            chain_id: 56,
            rpc_url: "https://bsc-dataseed.binance.org" 
        },

        TestNet: { 
            chain_id: 97,
            rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545" 
        },
    };
})();

__MODULE__ = module;
