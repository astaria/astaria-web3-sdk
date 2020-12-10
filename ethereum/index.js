Ethereum = (function() {
    return {};
})();

Ethereum.crypto    = require('crypto');
Ethereum.utils     = include('./utils/index.js');
Ethereum.auth      = include('./auth/index.js');
Ethereum.api       = include('./api/index.js');
Ethereum.broadcast = include('./broadcast/index.js');
Ethereum.erc20     = include('./erc20.js');

var module = (function() {
    const networks = include('./networks.js');

    return Object.assign(Ethereum, {
        net: networks.MainNet,

        configure_network: function(chain_id, rpc_url) {
            this.net = { 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        select_network: function(name) {
            this.net = networks[name] || networks.Ropsten;
        },
        
        version: function() {
            return "1.0";
        },
    });
})();

__MODULE__ = module;
