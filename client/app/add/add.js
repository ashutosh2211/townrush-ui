'use strict';

angular.module('townrushApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/add', {
        templateUrl: 'app/add/add.html',
        controller: 'AddCtrl'
      });
  });
