var module = (function() {
    function _query_for_tickers(currency, tokens) {
        var markets = [];
        var params = {};

        tokens.forEach(function(coin) {
            markets.push(currency.toUpperCase() + "-" + coin.toUpperCase());
        });
        
        params["markets"] = encodeURIComponent(markets.join(","));
     
        return _to_query_string(params);
    }
    
    function _to_query_string(params) {
        return Object.keys(params).map(function(k) {
            return k + "=" + params[k];
        }).join('&');
    }

    return {
        get_tokens: function() {
            return new Promise(function(resolve, reject) {
                var url = "https://api.upbit.com/v1/market/all";
                
                fetch(url)
                    .then(function(response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return Promise.reject({ 
                                status: response.status,
                                message: response.statusText
                            });
                        }
                    })
                    .then(function(data) {
                        var result = {};

                        data.forEach(function(entry) {
                            [ currency, coin ] = entry["market"].split("-");

                            if (!result.hasOwnProperty(currency)) {
                                result[currency] = [];
                            }

                            result[currency].push({
                                "coin": coin,
                                "name": {
                                    "ko": entry["korean_name"],
                                    "en": entry["english_name"]
                                }
                            });
                        });

                        resolve(result);
                    })
                    .catch(function(error) {
                        reject(error);
                    });    
            });
        },

        get_tickers: function(currency, tokens) {
            return new Promise(function(resolve, reject) {
                var url = "https://api.upbit.com/v1/ticker";
                var query = _query_for_tickers(currency, tokens);

                fetch(url + "?" + query)
                    .then(function(response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return Promise.reject({ 
                                status: response.status,
                                message: response.statusText
                            });
                        }
                    })
                    .then(function(data) {
                        var result = [];

                        data.forEach(function(entry) {
                            [ currency, coin ] = entry["market"].split("-");

                            result.push(Object.assign(entry, {
                                "coin": coin
                            }));
                        });

                        resolve(result);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
    }
})();

__MODULE__ = module;
