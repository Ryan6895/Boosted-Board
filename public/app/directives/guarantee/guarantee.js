angular.module('boosted')
    .directive('guarantee', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/guarantee/guarantee.html',
            link: function(scope, elem, attrs) {
              console.log('hello');
            }
        }
    });
