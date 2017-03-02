angular.module('boosted')
    .directive('navBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/navBar/navBar.html',
            controller: function($scope, service){
              service.getUser().then(function(response) {
                if (!response){
                  $scope.account = false;
                } else {
                  $scope.account = true;
                }
              $scope.getTotalQty = function (){
              service.getTotalQty().then(function(response) {
                $scope.totalQty = response.data[0].sum;
                console.log($scope.totalQty);
                if (!$scope.totalQty){
                  console.log('inner if');
                  $scope.cartQty = false;
                }else {
                  console.log('else if');
                  $scope.cartQty = true;
                }
              }).catch(function(err) {
                $scope.cartQty = false;
              });
            }
            $scope.getTotalQty();
              $scope.$on('myCustomEvent', function (event, data) {
                $scope.getTotalQty();
                console.log(data);
              });
              });

            },
            link: function(scope, elem, attrs) {

                $('.navDrop').on('click', function() {
                    $('.navDropDown').toggleClass("navDropHeight")
                })
            }
        }
    });
