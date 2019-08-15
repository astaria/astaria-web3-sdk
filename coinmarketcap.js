CoinMarketCap = (function() {
    return {}
})();

CoinMarketCap.get_ticker = function(coin, start, limit, handler) {
    var url = "https://api.coinmarketcap.com/v1/ticker/" + (coin || "");
    var params = {};

    params["start"] = start;
    params["limit"] = limit;
    
    url = url + "?" + CoinMarketCap.__to_query_string(params);
    
    fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(ticker) {
                handler(ticker);
            });
        } else {
            handler();
        }
    }, function(reason) {
        handler();
    });
}

CoinMarketCap.__to_query_string = function(params) {
    return Object.keys(params).map(function(k) {
        return k + "=" + params[k];
    }).join('&')
}

__MODULE__ = CoinMarketCap;
