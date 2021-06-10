var module = (function() {
    function _to_query_string(params) {
        return Object.keys(params).map(function(k) {
            return k + "=" + params[k];
        }).join('&');
    }

    return {
        get_ticker: function(coin, start, limit) {
            return new Promise(function(resolve, reject) {
                var url = "https://api.coinmarketcap.com/v1/ticker/" + (coin || "");
                var params = {};
            
                params["start"] = start;
                params["limit"] = limit;
                
                fetch(url + "?" + _to_query_string(params))
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
                        resolve(data);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },
    }
})();

__MODULE__ = module;
