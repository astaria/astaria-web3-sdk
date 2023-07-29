var module = (function() {
    const ethereum = require('chains/ethereum');

    global["__BINANCE__"] = Object.assign({}, __ETHEREUM__);

    global["__BINANCE__"].networks = include("./networks.js");
    global["__BINANCE__"].currency = include("./currency.js");

    return {
        create: function(network=__BINANCE__.networks.Mainnet) {
            const binance = Object.assign({}, __BINANCE__);

            binance.network   = network;
            binance.api       = __BINANCE__.api.create(binance.network);
            binance.broadcast = __BINANCE__.broadcast.create(binance.api);
            binance.token     = __BINANCE__.token.create(binance.api, binance.broadcast);

            return binance;
        },

        get_network_by_name(name) {
            return __BINANCE__.networks[name];
        }
    }
})();

__MODULE__ = module;
