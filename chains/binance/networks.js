const module = (function() {
    return {
        Mainnet: { 
            name: "Mainnet",
            chain_id: 56,
            rpc_url: "https://bsc-dataseed.binance.org" 
        },

        Testnet: { 
            name: "Testnet",
            chain_id: 97,
            rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545" 
        },
    };
})();

__MODULE__ = module;
