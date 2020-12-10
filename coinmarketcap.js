var module = (function() {
    function _to_query_string(params) {
        return Object.keys(params).map(function(k) {
            return k + "=" + params[k];
        }).join('&')
    }
    
    return {
        get_ticker: function(coin, start, limit, handler) {
            return new Promise(function(resolve, reject) {
                var url = "https://api.coinmarketcap.com/v1/ticker/" + (coin || "");
                var params = {};
            
                params["start"] = start;
                params["limit"] = limit;
                
                url = url + "?" + _to_query_string(params);
                
                fetch(url)
                    .then(function(response) {
                        if (response.ok) {
                            response.json()
                                .then(function(ticker) {
                                    resolve(ticker);
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
