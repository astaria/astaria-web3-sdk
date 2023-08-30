const module = (() => {
    const _ = require("chains/ethereum");

    global["__KLAYTN__"] = Object.assign({}, __ETHEREUM__);

    global["__KLAYTN__"].utils     = include("./utils.js");
    global["__KLAYTN__"].api       = include("./api/index.js");
    global["__KLAYTN__"].broadcast = include("./broadcast/index.js");
    global["__KLAYTN__"].networks  = include("./networks.js");
    global["__KLAYTN__"].currency  = include("./currency.js");

    return {
        create: (network=__KLAYTN__.networks.Cypress) => {
            const klaytn = Object.assign({}, __KLAYTN__);

            klaytn.network   = network;
            klaytn.api       = __KLAYTN__.api.create(klaytn.network);
            klaytn.broadcast = __KLAYTN__.broadcast.create(klaytn.api);
            klaytn.token     = __KLAYTN__.token.create(klaytn.api, klaytn.broadcast);

            return klaytn;
        },

        get_network_by_name: (name) => {
            return __KLAYTN__.networks[name];
        }
    }
})();

__MODULE__ = module;
