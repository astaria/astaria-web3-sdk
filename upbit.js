var module = (function() {
    function _query_for_candles(currency, coin, count) {
        var params = {};
        
        params["code"] = "CRIX.UPBIT." + currency.toUpperCase() + "-" + coin.toUpperCase();
        params["count"] = count;
     
        return _to_query_string(params);
    }
    
    function _to_query_string(params) {
        return Object.keys(params).map(function(k) {
            return k + "=" + params[k];
        }).join('&')
    }
    
    return {
        get_candles: function(currency, coin, count) {
            return new Promise(function(resolve, reject) {
                var url = "https://crix-api-endpoint.upbit.com/v1/crix/candles/days";
                var query = _query_for_candles(currency, coin, count);
                
                fetch(url+ "?" + query)
                    .then(function(response) {
                        if (response.ok) {
                            response.json()
                                .then(function(candles) {
                                    handler(candles);
                                }, function(error) {
                                    reject(error);
                                });
                        } else {
                            reject({ 
                                status: response.status,
                                message: response.statusText
                            });
                        }
                    }, function(error) {
                        reject(error);
                    });    
            });
        },
        
        version: function() {
            return "1.0";
        },
    }
})();

__MODULE__ = module;
