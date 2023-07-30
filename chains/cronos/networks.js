const module = (function() {
    return {
        Mainnet: { 
            name: "Mainnet",
            chain_id: 25,
            rpc_url: "https://evm.cronos.org" 
        },

        Testnet: { 
            name: "Testnet",
            chain_id: 97,
            rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545" 
        },
    };
})();

__MODULE__ = module;
