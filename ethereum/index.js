var module = (function() {
    const networks = include('./networks.js');

    global["__ETHEREUM__"] = global["__ETHEREUM__"] || {
        name: "Ethereum",
        net: networks.Mainnet
    };

    global["__ETHEREUM__"].crypto    = require("crypto");
    global["__ETHEREUM__"].utils     = include("./utils/index.js");
    global["__ETHEREUM__"].auth      = include("./auth/index.js");
    global["__ETHEREUM__"].api       = include("./api/index.js");
    global["__ETHEREUM__"].broadcast = include("./broadcast/index.js");
    global["__ETHEREUM__"].abi       = include("./abi/index.js");
    global["__ETHEREUM__"].erc20     = include("./erc20.js");
    global["__ETHEREUM__"].token     = global["__ETHEREUM__"].erc20;

    return Object.assign(global["__ETHEREUM__"], {
        select_network: function(name) {
            __ETHEREUM__.net = networks[name] || networks.Ropsten;
        },
        
        configure_network: function(name, chain_id, rpc_url) {
            __ETHEREUM__.net = { 
                name: name, 
                chain_id: chain_id, 
                rpc_url: rpc_url 
            }
        },

        get_network_name: function(network_id) {
            return __ETHEREUM__.net.name;
        },

        get_network_id: function() {
            return __ETHEREUM__.net.chain_id;
        },

        get_native_token() {
            return {
                "address": __ETHEREUM__.utils.get_native_address(),
                "name": "Ethereum",
                "symbol": "ETH",
                "decimals": 18
            }
        }
    });
})();

__MODULE__ = module;
