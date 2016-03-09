//Define an angular module for our app
var autoKey = angular.module('AutoKey', ['ngCookies']);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController






autoKey.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider.

    when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    }).

      when('/newClave', {
        templateUrl: 'templates/clave.html',
        controller: 'ClaveCtrl'
    }).

    when('/home', {
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    }).

      otherwise({
        redirectTo: '/login'
      });
}]);


autoKey.run(function($rootScope, $location, $cookieStore){
  $rootScope.showNavBar = false;
  $rootScope.server = 'http://intralab.kinal.edu.gt:3000/';

  $rootScope.globals = $cookieStore.get('globals') || {};

  if($rootScope.globals.currentUser){
      $location.path('/home');
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in
    if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
      $location.path('/login');
    }

  });

});
