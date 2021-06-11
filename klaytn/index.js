var module = (function() {
    const networks = include('./networks.js');

    global["__KLAYTN__"] = global["__KLAYTN__"] || {
        net: networks.MainNet
    };

    global["__KLAYTN__"].crypto    = require("crypto");
    global["__KLAYTN__"].auth      = include("./auth/index.js");
    global["__KLAYTN__"].broadcast = include("./broadcast/index.js");
    global["__KLAYTN__"].api       = include("./api/index.js");
    global["__KLAYTN__"].kip7      = include("./kip7.js");
    global["__KLAYTN__"].utils     = include("./utils.js");

    return Object.assign({
        select_network: function(name) {
            __KLAYTN__.net = networks[name] || networks.Ropsten;
        },
        
        configure_network: function(chain_id, rpc_url) {
            __KLAYTN__.net = { chain_id: chain_id, rpc_url: rpc_url }
        },
    }, global["__KLAYTN__"]);
})();

__MODULE__ = module;
