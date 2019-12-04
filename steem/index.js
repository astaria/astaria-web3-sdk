Steem = (function() {
    return {};
})();

Steem.crypto    = require('crypto');
Steem.struct    = require('struct');
Steem.auth      = include('./auth/index.js');
Steem.broadcast = include('./broadcast/index.js');
Steem.api       = include('./api/index.js');
Steem.networks  = include('./networks.js');

Steem.net = Steem.networks.MainNet;

Steem.select_network = function(name) {
    Steem.net = Steem.networks[name] || Steem.networks.TestNet;
}

Steem.configure_network = function(chain_id, pub_prefix, rpc_url) {
    Steem.net = { chain_id:chain_id, pub_prefix:pub_prefix, rpc_url:rpc_url }
}

Steem.version = function() {
    return "1.0";
}

__MODULE__ = Steem;
