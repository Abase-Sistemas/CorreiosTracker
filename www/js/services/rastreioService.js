app.factory('rastreioService', ['$http', function ($http) {
    var RastreioService = {};
    
    RastreioService.rastrear = function (codigo) {
        return $http.get('http://api.postmon.com.br/v1/rastreio/ect/' + codigo).then(function (results) {
            return results;
        }, function(error) {
            return error;
        });
    };
    
    return RastreioService;
}]);