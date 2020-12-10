EOS = (function() {
    return {};
})();

EOS.crypto    = require('crypto');
EOS.struct    = require('struct');
EOS.auth      = include('./auth/index.js');
EOS.api       = include('./api/index.js');
EOS.broadcast = include('./broadcast/index.js');
EOS.networks  = include('./networks.js');

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
