angular.module('boosted')
    .directive('help', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/help/help.html',
            link: function(scope, elem, attrs) {
            }
        }
    });
