const module = (function() {
    return {
        Mainnet: {
            name: "Mainnet", 
            chain_id: 1,
            rpc_url: "https://mainnet.infura.io" 
        },

        Ropsten: { 
            name: "Ropsten",
            chain_id: 3,
            rpc_url: "https://ropsten.infura.io" 
        },

        Rinkeby: { 
            name: "Rinkeby",
            chain_id: 4,
            rpc_url: "https://rinkeby.infura.io"
        },

        Goerli: {
            name: "Goerli",
            chain_id: 5, 
            rpc_url: "https://goerli.infura.io"
        },

        Kovan: { 
            name: "Kovan",
            chain_id: 42, 
            rpc_url: "https://kovan.infura.io"
        },
    };
})();

__MODULE__ = module;
