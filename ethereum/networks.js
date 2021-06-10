var module = (function() {
    return {
        MainNet: { 
            chain_id: 1,
            rpc_url: "https://mainnet.infura.io" 
        },

        Ropsten: { 
            chain_id: 3,
            rpc_url: "https://ropsten.infura.io" 
        },

        Rinkeby: { 
            chain_id: 4,
            rpc_url: "https://rinkeby.infura.io"
        },

        Goerli: {
            chain_id: 5, 
            rpc_url: "https://goerli.infura.io"
        },

        Kovan: { 
            chain_id: 42, 
            rpc_url: "https://kovan.infura.io"
        },
    };
})();

__MODULE__ = module;
