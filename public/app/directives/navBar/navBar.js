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
                //add button login and account depending if logged in
              });
            },
            link: function(scope, elem, attrs) {

                $('.navDrop').on('click', function() {
                    $('.navDropDown').toggleClass("navDropHeight")
                })
            }
        }
    });
