const module = (() => {
    const utils = __BINANCE__.utils;

    return {
        address: utils.get_native_address(),
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18
    }
})();

__MODULE__ = module;
