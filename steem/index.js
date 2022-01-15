var module = (function() {
    const networks = include('./networks.js');

    global["__STEEM__"] = global["__STEEM__"] || {
        net: networks.Mainnet
    };
    
    global["__STEEM__"].crypto    = require("crypto");
    global["__STEEM__"].struct    = require("struct");
    global["__STEEM__"].utxf      = require("utfx");
    global["__STEEM__"].auth      = include("./auth/index.js");
    global["__STEEM__"].broadcast = include("./broadcast/index.js");
    global["__STEEM__"].api       = include("./api/index.js");
    global["__STEEM__"].utils     = include("./utils.js");
    
    return Object.assign({
        select_network: function(name) {
            __STEEM__.net = networks[name] || networks.Testnet;
        },
        
        configure_network: function(chain_id, pub_prefix, rpc_url) {
            __STEEM__.net = { chain_id: chain_id, pub_prefix: pub_prefix, rpc_url: rpc_url }
        },
    }, global["__STEEM__"]);
})();

__MODULE__ = module;
