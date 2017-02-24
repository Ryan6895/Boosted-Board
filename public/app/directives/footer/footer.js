angular.module('boosted')
    .directive('footerView', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/footer/footer.html',
            controller: function($scope, service){
              $scope.addEmail = function(email){
                service.addemail(email);
              }
            },
            link: function(scope, elem, attrs) {
            }
        }
    });
