/**
 * Created by Malco Chacon on 14/01/2016.
 */

autoKey.factory('ClaveData', function($http, $rootScope){

    var ClaveData ={};

    ClaveData.saveClave = function(claves){

       return $http.post($rootScope.server + 'clave', claves);
    }
    return ClaveData;

});