var module = (function() {
    const networks = include('./networks.js');

    global["__TERRA__"] = global["__TERRA__"] || {
        name: "Klaytn",
        net: networks.Cypress
    };

    global["__TERRA__"].crypto    = require("crypto");
    global["__TERRA__"].utils     = include("./utils/index.js");
    global["__TERRA__"].auth      = include("./auth/index.js");
    global["__TERRA__"].api       = include("./api/index.js");
    global["__TERRA__"].broadcast = include("./broadcast/index.js");
    global["__TERRA__"].abi       = include("./abi/index.js");
    //global["__TERRA__"].kip7      = include("./kip7.js");

    return Object.assign({
        select_network: function(name) {
            __KLAYTN__.net = networks[name] || networks.Baobap;
        },
        
        configure_network: function(chain_id, rpc_url) {
            __KLAYTN__.net = { chain_id: chain_id, rpc_url: rpc_url }
        },
    }, global["__KLAYTN__"]);
})();

__MODULE__ = module;
