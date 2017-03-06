angular.module('boosted')
    .controller('itemCtrl', function($scope, service, $stateParams, $state) {
        service.getOneItem($stateParams.id).then(function(item) {
            $scope.item = item.data;

        })

        service.getUser().then(function(response) {
          if (!response){
            $scope.loggedin = false;
          } else {
            $scope.loggedin = true;
          }
        })

        $scope.addItem = function() {
          service.checkItems($stateParams.id).then(function(response) {
            console.log('getcartItems',response);
            if(!response.data.length){
              service.addtoCart($stateParams.id).then(function(response) {
              $state.go('cart');
              })
            } else {
              service.changeQuantity($stateParams.id).then(function(response) {
              $state.go('cart');
              })
            }
          });

          }

    })
