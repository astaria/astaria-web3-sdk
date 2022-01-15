var module = (function() {
    const networks = include('./networks.js');

    global["__BINANCE_SMART_CHAIN__"] = global["__BINANCE_SMART_CHAIN__"] || {
        net: networks.Mainnet
    };

    global["__BINANCE_SMART_CHAIN__"].crypto    = require("crypto");
    global["__BINANCE_SMART_CHAIN__"].auth      = include("./auth/index.js");
    global["__BINANCE_SMART_CHAIN__"].broadcast = include("./broadcast/index.js");
    global["__BINANCE_SMART_CHAIN__"].api       = include("./api/index.js");
    global["__BINANCE_SMART_CHAIN__"].bep20     = include("./bep20.js");
    global["__BINANCE_SMART_CHAIN__"].utils     = include("./utils/index.js");

    return Object.assign({
        select_network: function(name) {
            __BINANCE_SMART_CHAIN__.net = networks[name] || networks.Ropsten;
        },
        
        configure_network: function(chain_id, rpc_url) {
            __BINANCE_SMART_CHAIN__.net = { chain_id: chain_id, rpc_url: rpc_url }
        },
    }, global["__BINANCE_SMART_CHAIN__"]);
})();

__MODULE__ = module;
