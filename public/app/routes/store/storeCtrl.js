angular.module('boosted')
.controller('storeCtrl', function($scope, service, $state, $http, $location, $anchorScroll) {
  service.getItems(2).then(function(response){
    $scope.Items2 = response.data;
    console.log($scope.Items2);
  })
  service.getItems(1).then(function(results){
    $scope.Items1 = results.data;
    console.log($scope.Items1);
  })
  $scope.gotoAnchor = function(param){
    $location.hash(param);
    $anchorScroll();
  }
});
