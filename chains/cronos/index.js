const module = (function() {
    const ethereum = require('chains/ethereum');

    global["__CRONOS__"] = Object.assign({}, __ETHEREUM__);

    global["__CRONOS__"].networks = include("./networks.js");
    global["__CRONOS__"].currency = include("./currency.js");

    return {
        create: function(network=__CRONOS__.networks.MainNet) {
            const cronos = Object.assign({}, __CRONOS__);

            cronos.network   = network;
            cronos.api       = __CRONOS__.api.create(cronos.network);
            cronos.broadcast = __CRONOS__.broadcast.create(cronos.api);
            cronos.token     = __CRONOS__.token.create(cronos.api, cronos.broadcast);

            return cronos;
        },

        get_network_by_name(name) {
            return __CRONOS__.networks[name];
        }
    }
})();

__MODULE__ = module;
