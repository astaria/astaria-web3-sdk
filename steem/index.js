Steem = (function() {
    return {};
})();

Steem.crypto    = require('crypto');
Steem.struct    = require('struct');
Steem.auth      = include('./auth/index.js');
Steem.api       = include('./api/index.js');
Steem.broadcast = include('./broadcast/index.js');

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
