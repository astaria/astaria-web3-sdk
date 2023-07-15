var module = (function() {
    const networks = include('./networks.js');

    global["__POLYGON__"] = global["__POLYGON__"] || {
        name: "Polygon",
        net: networks.Mainnet
    };

    global["__POLYGON__"].crypto    = require("crypto");
    global["__POLYGON__"].utils     = include("./utils/index.js");
    global["__POLYGON__"].auth      = include("./auth/index.js");
    global["__POLYGON__"].api       = include("./api/index.js");
    global["__POLYGON__"].broadcast = include("./broadcast/index.js");
    global["__POLYGON__"].abi       = include("./abi/index.js");
    global["__POLYGON__"].erc20     = include("./erc20.js");
    global["__POLYGON__"].token     = global["__POLYGON__"].erc20;

    return Object.assign(global["__POLYGON__"], {
        select_network: function(name) {
            __POLYGON__.net = networks[name] || networks.Mumbai;
        },
        
        configure_network: function(name, chain_id, rpc_url) {
            __POLYGON__.net = { 
                name: name, 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        get_network_name: function() {
            return __POLYGON__.net.name;
        },

        get_network_id: function() {
            return __POLYGON__.net.chain_id;
        },

        get_native_token() {
            return {
                "address": __POLYGON__.utils.get_native_address(),
                "name": "Polygon",
                "symbol": "MATIC",
                "decimals": 18
            }
        }
    });
})();

__MODULE__ = module;
