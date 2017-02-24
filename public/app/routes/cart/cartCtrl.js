angular.module('boosted')
.controller('cartCtrl', function($scope,service, $state) {
  $scope.reloadRoute = function() {
     $state.reload();
  }
  service.getallcartItems().then(function(response){

    $scope.items = response.data;
  })
  $scope.removeItem = function(id) {
    //console.log(id);
      service.removeItems(id);
      $state.reload();
  }
});
