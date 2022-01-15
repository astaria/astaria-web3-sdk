var module = (function() {
    const networks = include('./networks.js');

    global["__ETHEREUM__"] = global["__ETHEREUM__"] || {
        name: "Ethereum",
        net: networks.Mainnet
    };

    global["__ETHEREUM__"].crypto    = require("crypto");
    global["__ETHEREUM__"].auth      = include("./auth/index.js");
    global["__ETHEREUM__"].broadcast = include("./broadcast/index.js");
    global["__ETHEREUM__"].api       = include("./api/index.js");
    global["__ETHEREUM__"].erc20     = include("./erc20.js");
    global["__ETHEREUM__"].utils     = include("./utils/index.js");

    return Object.assign({
        select_network: function(name) {
            __ETHEREUM__.net = networks[name] || networks.Ropsten;
        },
        
        configure_network: function(chain_id, rpc_url) {
            __ETHEREUM__.net = { chain_id: chain_id, rpc_url: rpc_url }
        },
    }, global["__ETHEREUM__"]);
})();

__MODULE__ = module;
