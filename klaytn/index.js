var module = (function() {
    const networks = include('./networks.js');

    global["__KLAYTN__"] = global["__KLAYTN__"] || {
        name: "Klaytn",
        net: networks.Cypress
    };

    global["__KLAYTN__"].crypto    = require("crypto");
    global["__KLAYTN__"].utils     = include("./utils/index.js");
    global["__KLAYTN__"].auth      = include("./auth/index.js");
    global["__KLAYTN__"].api       = include("./api/index.js");
    global["__KLAYTN__"].broadcast = include("./broadcast/index.js");
    global["__KLAYTN__"].abi       = include("./abi/index.js");
    global["__KLAYTN__"].kip7      = include("./kip7.js");
    global["__KLAYTN__"].token     = global["__KLAYTN__"].kip7;

    return Object.assign(global["__KLAYTN__"], {
        select_network: function(name) {
            __KLAYTN__.net = networks[name] || networks.Baobap;
        },
        
        configure_network: function(name, chain_id, rpc_url) {
            __KLAYTN__.net = { 
                name: name, 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        get_network_name: function(network_id) {
            return __KLAYTN__.net.name;
        },

        get_network_id: function() {
            return __KLAYTN__.net.chain_id;
        },

        get_native_token() {
            return {
                "address": __KLAYTN__.utils.get_native_address(),
                "name": "Klaytn",
                "symbol": "KLAY",
                "decimals": 18
            }
        }
    });
})();

__MODULE__ = module;
