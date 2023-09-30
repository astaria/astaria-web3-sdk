const module = (() => {
    global["__STEEM__"] = {};
    
    global["__STEEM__"].crypto    = require("crypto");
    global["__STEEM__"].struct    = require("struct");
    global["__STEEM__"].utxf      = require("utfx");
    global["__STEEM__"].utils     = require("./utils");
    global["__STEEM__"].auth      = require("./auth");
    global["__STEEM__"].api       = require("./api");
    global["__STEEM__"].broadcast = require("./broadcast");
    global["__STEEM__"].networks  = require("./networks");

    return {
        create: (network=__STEEM__.networks.Mainnet) => {
            const steem = Object.assign({}, __STEEM__);

            steem.network   = network;
            steem.api       = __STEEM__.api.create(steem.network);
            steem.broadcast = __STEEM__.broadcast.create(steem.api);

            return steem;
        },

        get_network_by_name: (name) => {
            return __STEEM__.networks[name];
        }
    }
})();

__MODULE__ = module;
