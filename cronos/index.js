var module = (function() {
    const networks = include('./networks.js');

    global["__CRONOS__"] = global["__CRONOS__"] || {
        name: "Binance Smart Chain",
        net: networks.Mainnet
    };

    global["__CRONOS__"].crypto    = require("crypto");
    global["__CRONOS__"].utils     = include("./utils/index.js");
    global["__CRONOS__"].auth      = include("./auth/index.js");
    global["__CRONOS__"].api       = include("./api/index.js");
    global["__CRONOS__"].broadcast = include("./broadcast/index.js");
    global["__CRONOS__"].abi       = include("./abi/index.js");
    global["__CRONOS__"].crc20     = include("./crc20.js");
    global["__CRONOS__"].token     = global["__CRONOS__"].crc20;

    return Object.assign(global["__CRONOS__"], {
        select_network: function(name) {
            __CRONOS__.net = networks[name] || networks.Testnet;
        },
        
        configure_network: function(name, chain_id, rpc_url) {
            __CRONOS__.net = { 
                name: name, 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        get_network_name: function(network_id) {
            return __CRONOS__.net.name;
        },

        get_network_id: function() {
            return __CRONOS__.net.chain_id;
        },

        get_native_token() {
            return {
                "address": __CRONOS__.utils.get_native_address(),
                "name": "Cronos Coin",
                "symbol": "CRO",
                "decimals": 18
            }
        }
    });
})();

__MODULE__ = module;
