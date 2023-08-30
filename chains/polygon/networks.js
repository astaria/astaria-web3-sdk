const module = (() => {
    return {
        Mainnet: {
            name: "Mainnet",
            chain_id: 137,
            rpc_url: "https://polygon-rpc.com" 
        },

        Mumbai: { 
            name: "Mumbai",
            chain_id: 80001,
            rpc_url: "https://rpc-mumbai.matic.today" 
        },
    };
})();

__MODULE__ = module;
