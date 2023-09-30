const module = (() => {
    const _ = require("chains/ethereum");

    global["__POLYGON__"] = Object.assign({}, __ETHEREUM__);

    global["__POLYGON__"].networks = require("./networks");
    global["__POLYGON__"].currency = require("./currency");

    return {
        create: (network=__POLYGON__.networks.Mainnet) => {
            const polygon = Object.assign({}, __POLYGON__);

            polygon.network   = network;
            polygon.api       = __POLYGON__.api.create(polygon.network);
            polygon.broadcast = __POLYGON__.broadcast.create(polygon.api);
            polygon.token     = __POLYGON__.token.create(polygon.api, polygon.broadcast);

            return polygon;
        },

        get_network_by_name: (name) => {
            return __POLYGON__.networks[name];
        }
    }
})();

__MODULE__ = module;
