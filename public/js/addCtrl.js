// var addCtrl = angular.module('addCtrl', ['geolocation']);
//
// addCtrl.controller('addCtrl', ['$scope', '$http', 'geolocation', function($scope, $http, geolocation){
//
//   $scope.formData = {};
//   var coords = {};
//   var lat = 0;
//   var long = 0;
//
//   $scope.formData.latitude = 39.500;
//   $scope.formData.longitude = -98.350;
//
//   $scope.createUser = function(){
//
//     var userData = {
//       username: $scope.formData.username,
//       gender: $scope.formData.gender,
//       age: $scope.formData.age,
//       dream: $scope.formData.dream,
//       location: [$scope.formData.longitude, $scope.formData.latitude],
//       htmlverified: $scope.formData.htmlverified
//     };
//
//     $http.post('/users', userData)
//       .success(function(data) {
//         $scope.formData.username = '';
//         $scope.formData.gender = '';
//         $scope.formData.age = '';
//         $scope.formData.dream = '';
//         // gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
//       }).error(function(data){
//         console.log('Error: ', + data);
//       });
//   };
// }]);
