const module = (() => {
    const utils = __POLYGON__.utils;

    return {
        address: utils.get_native_address(),
        name: "Polygon",
        symbol: "MATIC",
        decimals: 18
    }
})();

__MODULE__ = module;
