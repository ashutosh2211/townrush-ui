'use strict';

angular.module('townrushApp')
  .controller('DashboardCtrl', function ($scope,$rootScope,$http,$sessionStorage) {

    $scope.shipments_fetched=false;
    //fetch cached shipments from rootScope
    $scope.entity_id=$sessionStorage.entity_id;
    $scope.entity_name=$sessionStorage.entity_name;
    $scope.shipments=$rootScope.shipments || [];

    

    //if empty cache make api call
    if($scope.entity_id!=null && $scope.shipments.length==0){
        
        $http.get('http://www.townrush.in/api/v1/client/'+$scope.entity_id+'/dashboard',
            {headers:{'Authorization':'Basic 7c443814116f403f'}})
            .success(function(data,status,config,headers){

                
                $sessionStorage.entity_name=$scope.entity_name=data.results.organisation_pickup_address.name;
                $scope.shipments=data.results.shipments;
                $rootScope.shipments=$scope.shipments;
                $scope.shipments_fetched=true;
                
        });        
    }else{
        $scope.shipments_fetched=true;
    }



  });
