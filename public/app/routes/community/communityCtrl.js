angular.module('boosted')
.controller('communityCtrl', function($scope,service, $state, $http) {
  service.getblogs().then(function(response){
    $scope.blogs = response.data;
    console.log($scope.blogs[0].blogid);
  })
});
