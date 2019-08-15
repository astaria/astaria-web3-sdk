Ethereum = (function() {
    return {};
})();

Ethereum.crypto    = require('crypto');
Ethereum.struct    = require('struct');
Ethereum.auth      = include('./auth/index.js');
Ethereum.broadcast = include('./broadcast/index.js');
Ethereum.api       = include('./api/index.js');
Ethereum.erc20     = include('./erc20.js');
Ethereum.utils     = include('./utils.js');

Ethereum.version = function() {
    return "1.0";
}

__MODULE__ = Ethereum;
