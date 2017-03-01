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
                if ($scope.totalQty == 0){
                  $scope.cartQty = false;
                }else {
                  $scope.cartQty = true;
                }
              })
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
