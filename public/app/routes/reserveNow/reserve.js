angular.module('boosted')
.controller('reserve', function($scope,service, $state, $timeout) {
  $scope.specs = 5;
  $scope.batteries = 1;
  $scope.specBattery = 6;
  $scope.changeBoard = function() {
    $scope.specBattery = $scope.specs + $scope.batteries;
    console.log($scope.specBattery);
  }
  $scope.addBoard = function() {
    if ($scope.specBattery === 6){
      $scope.itemId = 18;
    } else if ($scope.specBattery === 7){
      $scope.itemId = 17;
    } else if ($scope.specBattery === 11){
      $scope.itemId = 16;
    } else {
      $scope.itemId = 15;
    }
    service.addtoCart($scope.itemId).then(function(response) {
      console.log(response);
    })
    $state.go('cart');
  }
  service.getUser().then(function(response) {
    if (!response){
      $scope.account = false;
    } else {
      $scope.account = true;
    }
  })
});
