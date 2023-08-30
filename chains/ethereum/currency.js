const module = (() => {
    const utils = __ETHEREUM__.utils;

    return {
        address: utils.get_native_address(),
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18
    }
})();

__MODULE__ = module;
