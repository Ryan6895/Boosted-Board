angular.module('boosted')
.controller('cartCtrl', function($scope,service, $state) {
  $scope.updateInitial = function() {
    $state.reload();
  }
$scope.updateInitial();

  $scope.updateCart = function(){
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
}
$scope.usePayment = function(value){
  service.usepayment(value);
}

$scope.paymentsoff = function (){
  $scope.paymentAmount = 0;
  $scope.paymentButton = true;
  $scope.usePayment($scope.paymentAmount);
}
$scope.paymentsoff();

$scope.paymentson = function () {
  service.gettotalPayments().then(function(response) {
  $scope.paymentAmount = response.data[0].sum;
  $scope.paymentButton = false;
  $scope.usePayment($scope.paymentAmount);
})
}

$scope.updateCart();
  $scope.removeItem = function(id) {
    //console.log(id);
      service.removeItems(id).then(function(response) {
        $scope.updateCart();
        $scope.getTotal();
        $scope.$emit('myCustomEvent', 'success');
      });
      // $state.reload();
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
      $scope.updateCart();
      $scope.getTotal();
      $scope.$emit('myCustomEvent', 'success');
    });
  }
});
