'use strict';

angular.module('eTrade')
.controller('ProfileCtrl', function($scope, Profile){
  $scope.afUser.$loaded(createScope);
  $scope.afUser.$watch(createScope);

  $scope.deposit = function(amount){
    console.log($scope.afUser.profile);
    Profile.deposit(amount)
    .then(function(){
      $scope.amount = 0;
    });
  };


  $scope.save = function(profile){
    Profile.save(profile);
  };

  function createScope(){
    $scope.profile = $scope.afUser.profile;
    $scope.balance = $scope.afUser.balance;
  }
});
