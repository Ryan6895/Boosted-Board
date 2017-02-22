angular.module('boosted')
    .directive('footerView', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/footer/footer.html',
            link: function(scope, elem, attrs) {
            }
        }
    });
