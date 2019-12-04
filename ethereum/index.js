Ethereum = (function() {
    return {};
})();

Ethereum.crypto    = require('crypto');
Ethereum.struct    = require('struct');
Ethereum.auth      = include('./auth/index.js');
Ethereum.broadcast = include('./broadcast/index.js');
Ethereum.api       = include('./api/index.js');
Ethereum.networks  = include('./networks.js')
Ethereum.erc20     = include('./erc20.js');
Ethereum.utils     = include('./utils.js');

Ethereum.net = Ethereum.networks.MainNet;

Ethereum.select_network = function(name) {
    Ethereum.net = Ethereum.networks[name] || Ethereum.networks.Ropsten;
}

Ethereum.configure_network = function(chain_id, rpc_url) {
    Ethereum.net = { chain_id:chain_id, rpc_url:rpc_url }
}

Ethereum.version = function() {
    return "1.0";
}

__MODULE__ = Ethereum;
