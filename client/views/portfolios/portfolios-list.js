'use strict';

angular.module('eTrade')
.controller('PortfoliosListCtrl', function($scope){
  $scope.afUser.$loaded(function(){
    // split names into string or empty array
    $scope.names = $scope.afUser.names ? $scope.afUser.names.split(',') : [];
    $scope.balance =$scope.afUser.balance;
  });
});
