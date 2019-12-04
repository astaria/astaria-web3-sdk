EOS = (function() {
    return {};
})();

EOS.crypto    = require('crypto');
EOS.struct    = require('struct');
EOS.auth      = include('./auth/index.js');
EOS.broadcast = include('./broadcast/index.js');
EOS.api       = include('./api/index.js');
EOS.networks  = include('./networks.js');

EOS.net = EOS.networks.MainNet;

EOS.select_network = function(name) {
    EOS.net = EOS.networks[name] || EOS.networks.TestNet;
}

EOS.configure_network = function() {
    EOS.net = {}
}

EOS.version = function() {
    return "1.0";
}

__MODULE__ = EOS;
