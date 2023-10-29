const module = (function() {
    const _ = require("../ethereum");

    global["__BINANCE__"] = Object.assign({}, __ETHEREUM__);

    global["__BINANCE__"].networks = require("./networks");
    global["__BINANCE__"].currency = require("./currency");

    return {
        create: function(network=__BINANCE__.networks.Mainnet) {
            const binance = Object.assign({}, __BINANCE__);

            binance.network   = network;
            binance.api       = __BINANCE__.api.create(binance.network);
            binance.broadcast = __BINANCE__.broadcast.create(binance.api);
            binance.token     = __BINANCE__.token.create(binance.api, binance.broadcast);

            return binance;
        },

        get_network_by_name: function(name) {
            return __BINANCE__.networks[name];
        }
    }
})();

__MODULE__ = module;
