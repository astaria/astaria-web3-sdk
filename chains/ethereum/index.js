const module = (() => {
    global["__ETHEREUM__"] = {};

    global["__ETHEREUM__"].crypto    = require("crypto");
    global["__ETHEREUM__"].utils     = require("./utils");
    global["__ETHEREUM__"].auth      = require("./auth");
    global["__ETHEREUM__"].abi       = require("./abi");
    global["__ETHEREUM__"].api       = require("./api");
    global["__ETHEREUM__"].broadcast = require("./broadcast");
    global["__ETHEREUM__"].networks  = require("./networks");
    global["__ETHEREUM__"].currency  = require("./currency");
    global["__ETHEREUM__"].token     = require("./erc20");

    return {
        create: (network=__ETHEREUM__.networks.Mainnet) => {
            const ethereum = Object.assign({}, __ETHEREUM__);

            ethereum.network   = network;
            ethereum.api       = __ETHEREUM__.api.create(ethereum.network);
            ethereum.broadcast = __ETHEREUM__.broadcast.create(ethereum.api);
            ethereum.token     = __ETHEREUM__.token.create(ethereum.api, ethereum.broadcast);

            return ethereum;
        },

        get_network_by_name: (name) => {
            return __ETHEREUM__.networks[name];
        }
    }
})();

__MODULE__ = module;
