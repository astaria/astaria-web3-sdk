const module = (function() {
    const _ = require("../ethereum");

    global["__KLAYTN__"] = Object.assign({}, __ETHEREUM__);

    global["__KLAYTN__"].utils     = require("./utils");
    global["__KLAYTN__"].api       = require("./api");
    global["__KLAYTN__"].broadcast = require("./broadcast");
    global["__KLAYTN__"].networks  = require("./networks");
    global["__KLAYTN__"].currency  = require("./currency");

    return {
        create: function(network=__KLAYTN__.networks.Cypress) {
            const klaytn = Object.assign({}, __KLAYTN__);

            klaytn.network   = network;
            klaytn.api       = __KLAYTN__.api.create(klaytn.network);
            klaytn.broadcast = __KLAYTN__.broadcast.create(klaytn.api);
            klaytn.token     = __KLAYTN__.token.create(klaytn.api, klaytn.broadcast);

            return klaytn;
        },

        get_network_by_name: function(name) {
            return __KLAYTN__.networks[name];
        }
    }
})();

__MODULE__ = module;
