angular.module('boosted')
.controller('itemCtrl', function($scope, service , $stateParams) {
  service.getOneItem($stateParams.id).then(function(item) {
    $scope.item = item.data;
      console.log(item);
})
})
