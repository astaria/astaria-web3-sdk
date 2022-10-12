var module = (function() {
    const networks = include('./networks.js');

    global["__BINANCE__"] = global["__BINANCE__"] || {
        name: "Binance Smart Chain",
        net: networks.Mainnet
    };

    global["__BINANCE__"].crypto    = require("crypto");
    global["__BINANCE__"].utils     = include("./utils/index.js");
    global["__BINANCE__"].auth      = include("./auth/index.js");
    global["__BINANCE__"].api       = include("./api/index.js");
    global["__BINANCE__"].broadcast = include("./broadcast/index.js");
    global["__BINANCE__"].abi       = include("./abi/index.js");
    global["__BINANCE__"].bep20     = include("./bep20.js");
    global["__BINANCE__"].token     = global["__BINANCE__"].bep20;

    return Object.assign(global["__BINANCE__"], {
        select_network: function(name) {
            __BINANCE__.net = networks[name] || networks.Testnet;
        },
        
        configure_network: function(name, chain_id, rpc_url) {
            __BINANCE__.net = { 
                name: name, 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        get_network_name: function(network_id) {
            return __BINANCE__.net.name;
        },

        get_network_id: function() {
            return __BINANCE__.net.chain_id;
        },

        get_native_token() {
            return {
                "address": __BINANCE__.utils.get_native_address(),
                "name": "Binance Coin",
                "symbol": "BNB",
                "decimals": 18
            }
        }
    });
})();

__MODULE__ = module;
