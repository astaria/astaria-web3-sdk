var module = (function() {
    var _tx_number = 1;

    function _request_rpc(method, params) {
        return new Promise(function(resolve, reject) {
            var request = _build_request(method, params);
            var url = EOS.net.rpc_url;
            var headers = _rpc_headers();
    
            fetch(url, {
                method: "POST", 
                header: headers, 
                body: JSON.stringify(request)
            })
                .then(function(response) {
                    response.json()
                        .then(function(data) {
                            if (data["result"]) {
                                resolve(data["result"]);
                            } else {
                                reject(data["error"]);
                            }
                        }, function(error) {
                            reject(error);
                        });
                }, function(error) {
                    reject(error);
                });
        });
    }
    
    function _build_request(method, params) {
        var request = {};
    
        request["jsonrpc"] = "2.0";
        request["method"]  = method;
        request["params"]  = params;
        request["id"]      = _tx_number;
    
        _tx_number += 1;
    
        return request;
    }
    
    function _rpc_headers() {
        var headers = {};
    
        headers["Content-Type"] = "application/json-rpc";
    
        return headers;
    }
        
    return {
    }
})();

__MODULE__ = module;
