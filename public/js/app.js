/////////////////////////////////
/////// DREAM APP ANGULAR ///////
/////////////////////////////////
var app = angular.module('dreamApp', ['addCtrl', 'geolocation', 'gservice', 'ngRoute'])
  .config(function($routeProvider){
    $routeProvider.when('/join', {
      controller: 'addCtrl',
      templateUrl: './partials/addForm.html'
    }).when('/find', {
      templateUrl: './partials/queryForm.html'
    }).otherwise({ redirectTo: '/join' });
});
