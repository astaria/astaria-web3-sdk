EOS = (function() {
    return {};
})();

EOS.crypto    = require('crypto');
EOS.struct    = require('struct');
EOS.auth      = include('./auth/index.js');
EOS.broadcast = include('./broadcast/index.js');
EOS.api       = include('./api/index.js');

EOS.version = function() {
    return "0.1";
}

__MODULE__ = EOS;
