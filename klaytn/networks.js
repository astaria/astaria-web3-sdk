var module = (function() {
    return {
        Cypress: {
            name: "Cypress",
            chain_id: 8217,
            rpc_url: "https://api.cypress.klaytn.net:8651" 
        },

        Baobap: { 
            name: "Baobap",
            chain_id: 1001,
            rpc_url: "https://api.baobab.klaytn.net:8651" 
        },
    };
})();

__MODULE__ = module;
