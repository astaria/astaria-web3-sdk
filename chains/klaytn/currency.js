const module = (() => {
    const utils = __KLAYTN__.utils;

    return {
        address: utils.get_native_address(),
        name: "Klaytn",
        symbol: "KLAY",
        decimals: 18
    }
})();

__MODULE__ = module;
