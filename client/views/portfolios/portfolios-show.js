'use strict';

angular.module('eTrade')
.controller('PortfoliosShowCtrl', function($scope, $state, Portfolio, Stock){
  $scope.name = $state.params.name;
  $scope.stocks = Portfolio.getStocks($state.params.name);
  $scope.stocks.$watch(computePosition);
  $scope.profileName = $scope.afUser.profile.name;
  $scope.balance = $scope.afUser.balance;


  $scope.purchase = function(s){
    var stock = new Stock(s);
    stock.getQuote()
    .then(function(response){
      stock.quote = response.data.LastPrice;
      console.log(response.data);
      if(stock.purchase()){
        Portfolio.addStock(stock, $state.params.name).then(clearFields);
      }
    });
  };

  $scope.sell = function(s){
    var id = s.$id;
    var stock = new Stock(s);

    stock.getQuote()
    .then(function(response){
      stock.quote = response.data.LastPrice;
      Portfolio.sellStock(stock, $state.params.name, id);

  
    })


  };

  function clearFields(){
    $scope.stock = null;
  }

  function computePosition(){
    $scope.position = $scope.stocks.reduce(function(acc, stock){
      return acc + stock.position;
    }, 0);
    $scope.balance = $scope.afUser.balance;
  }
});
