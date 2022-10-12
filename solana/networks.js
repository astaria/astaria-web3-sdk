var module = (function() {
    return {
        MainnetBeta: {
            name: "MainnetBeta",
            chain_id: 137,
            rpc_url: "https://api.mainnet-beta.solana.com" 
        },

        Devnet: { 
            name: "Devnet",
            chain_id: 80001,
            rpc_url: "https://api.devnet.solana.com" 
        },
    };
})();

__MODULE__ = module;
