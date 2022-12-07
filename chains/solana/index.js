var module = (function() {
    const networks = include('./networks.js');

    global["__SOLANA__"] = global["__SOLANA__"] || {
        name: "Polygon",
        net: networks.Mainnet
    };

    global["__SOLANA__"].crypto    = require("crypto");
    global["__SOLANA__"].utils     = include("./utils/index.js");
    global["__SOLANA__"].auth      = include("./auth/index.js");
    global["__SOLANA__"].api       = include("./api/index.js");
    global["__SOLANA__"].broadcast = include("./broadcast/index.js");
    global["__SOLANA__"].abi       = include("./abi/index.js");
//    global["__SOLANA__"].erc20     = include("./erc20.js");
    global["__SOLANA__"].token     = global["__SOLANA__"].erc20;

    return Object.assign(global["__SOLANA__"], {
        select_network: function(name) {
            __SOLANA__.net = networks[name] || networks.Mumbai;
        },
        
        configure_network: function(name, chain_id, rpc_url) {
            __SOLANA__.net = { 
                name: name, 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        get_network_name: function(network_id) {
            return __SOLANA__.net.name;
        },

        get_network_id: function() {
            return __SOLANA__.net.chain_id;
        },

        get_native_token() {
            return {
                "address": __SOLANA__.utils.get_native_address(),
                "name": "Solana",
                "symbol": "SOL",
                "decimals": 18
            }
        }
    });
})();

__MODULE__ = module;
