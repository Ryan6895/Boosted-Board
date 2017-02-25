angular.module('boosted')
    .controller('itemCtrl', function($scope, service, $stateParams) {
        service.getOneItem($stateParams.id).then(function(item) {
            $scope.item = item.data;
            console.log(item);
        })
        $scope.addItem = function() {
          service.getcartItems($stateParams.id).then(function(response) {
            if(response.data[0].product_id != $stateParams.id){
              service.addtoCart($stateParams.id);
            } else {
              service.changeQuantity($stateParams.id);
            }
          });

          }

    })
