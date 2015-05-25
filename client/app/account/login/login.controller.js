'use strict';

angular.module('townrushApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window,$http,$rootScope,$sessionStorage) {
    $scope.user = {};
    $scope.errors = {};
    $scope.storage=$sessionStorage;

    $scope.login = function(form) {
      $scope.submitted = true;



      if(form.$valid) {
        

        console.log($('.form').serializeArray());

        

       

        $http({
          method:'POST',
          url:'http://www.townrush.in/api/v1/dashboard',
          data:$.param({username:$scope.user.username,
                      password:$scope.user.password,
                      commit:'Login'}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded',Authorization:'Basic 7c443814116f403f'}

        })
          .success(function(data,status,config,headers){
            console.log(data);
            if(data.code=='login_successful'){
              $rootScope.entity_id=data.params.entity_id;
              $scope.storage.entity_id=data.params.entity_id;
              $location.path('/dashboard');
            }
          });


        /*Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
        */

      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
