//Define an angular module for our app
var autoKey = angular.module('AutoKey', []);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController


autoKey.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider.
      when('/NewClave', {
        templateUrl: 'templates/clave.html',
        controller: 'ClaveCtrl'
    }).
      otherwise({
        redirectTo: '/NewClave'
      });
}]);

autoKey.run(function($rootScope){
  $rootScope.server = 'http://localhost:3000/';
});

