angular.module('boosted')
.controller('homeCtrl', function($scope,service, $state, $timeout) {
 $scope.fadeIn = false;
$timeout(function(){
$scope.fadeIn = true;
} , 200)
});
