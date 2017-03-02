angular.module('boosted')
    .directive('checkoutCart', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/checkoutCart/checkoutCart.html',
            controller: function($scope, service){
              service.getallcartItems().then(function(response){
                $scope.items = response.data;
                console.log('$scope.items', $scope.items);
                if (!$scope.items.length) {
                  $scope.emptyCart = true;
                  $scope.fullCart = false;
                }else {
                  $scope.emptyCart = false;
                  $scope.fullCart = true;
                }
                $scope.getTotal();
              })
              
              service.gettotalPayments().then(function(response) {
                $scope.paymentAmount = response.data[0].sum;
              });
              $scope.getTotal = function() {
                var total = 0;
                for (var i = 0; i < $scope.items.length; i++) {
                  total += $scope.items[i].price * $scope.items[i].qty
                }
                $scope.totalPrice = total;
                $scope.total=total;
              }
            },
            scope:{
              total: '=',
              paymentmethod: '='
            }
        }
    });
