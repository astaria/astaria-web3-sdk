const module = (function() {
    global["__ETHEREUM__"] = {};

    global["__ETHEREUM__"].crypto    = require("crypto");
    global["__ETHEREUM__"].utils     = include("./utils/index.js");
    global["__ETHEREUM__"].auth      = include("./auth/index.js");
    global["__ETHEREUM__"].abi       = include("./abi/index.js");
    global["__ETHEREUM__"].api       = include("./api/index.js");
    global["__ETHEREUM__"].broadcast = include("./broadcast/index.js");
    global["__ETHEREUM__"].networks  = include("./networks.js");
    global["__ETHEREUM__"].currency  = include("./currency.js");
    global["__ETHEREUM__"].token     = include("./erc20.js");

    return {
        create: function(network=__ETHEREUM__.networks.Mainnet) {
            const ethereum = Object.assign({}, __ETHEREUM__);

            ethereum.network   = network;
            ethereum.api       = __ETHEREUM__.api.create(ethereum.network);
            ethereum.broadcast = __ETHEREUM__.broadcast.create(ethereum.api);
            ethereum.token     = __ETHEREUM__.token.create(ethereum.api, ethereum.broadcast);

            return ethereum;
        },

        get_network_by_name(name) {
            return __ETHEREUM__.networks[name];
        }
    }
})();

__MODULE__ = module;
