'use strict';

angular.module('bank-account', ['firebase'])
.run(['$rootScope', function($rootScope){
  $rootScope.balance = 10000;
  $rootScope.name = 'John Doe';
}])
.controller('master', ['$rootScope','$scope', function($rootScope, $scope){
  $scope.withdraws = [];
  $scope.deposits = [];
  $scope.fees = [];

  $scope.deposit = function(){
    $rootScope.balance += $scope.amount;

    $scope.deposits.push({amount: $scope.amount, date: (new Date())});
  };
  $scope.withdraw = function(){

    if ($scope.amount > $rootScope.balance && $rootScope.balance >= 0){
      $rootScope.balance -= ($scope.amount + 50);
      $scope.withdraws.push({amount: $scope.amount, date: (new Date())});
      $scope.fees.push({amount: 50, date: (new Date())});
    }
    else if ($scope.balance > 0){
      $rootScope.balance -= $scope.amount;
      $scope.withdraws.push({amount: $scope.amount, date: (new Date())});
    }

  };

  $scope.removeVal = function(index){
    if (this.deposit.amount !== undefined){
      $scope.deposits.splice(index, 1);
      $rootScope.balance -= this.deposit.amount;
    }
    else if (this.withdraw.amount !== undefined){
      $scope.withdraws.splice(index, 1);
      $rootScope.balance += this.withdraw.amount;
    }
    else if (this.fee.amount !== undefined){
      $scope.fees.splice(index, 1);
      $rootScope.balance += this.fee.amount;
    }
  }
}]);
