angular.module('boosted')
.controller('cartCtrl', function($scope,service, $state) {
  $scope.reloadRoute = function() {
     $state.reload();
  }
  service.getallcartItems().then(function(response){
    $scope.items = response.data;
    if (!$scope.items.length) {
      $scope.emptyCart = true;
      $scope.fullCart = false;
    } else {
      $scope.emptyCart = false;
      $scope.fullCart = true;
    }
    $scope.getTotal();
  })
  service.gettotalPayments().then(function(response) {
    $scope.paymentAmount = response.data[0].sum;
  });
  $scope.removeItem = function(id) {
    //console.log(id);
      service.removeItems(id);
      $state.reload();
  }
  $scope.getTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.items.length; i++) {
      total += $scope.items[i].price * $scope.items[i].qty
    }
    $scope.totalPrice = total;
  }
  $scope.updateItem = function(id,qty){
    service.updateQty(id, qty).then(function(response) {
      $scope.getTotal();
    });
  }
});
