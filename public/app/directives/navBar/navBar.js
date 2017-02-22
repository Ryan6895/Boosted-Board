angular.module('boosted')
    .directive('navBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/directives/navBar/navBar.html',
            link: function(scope, elem, attrs) {

                $('.navDrop').on('click', function() {
                    $('.navDropDown').toggleClass("navDropHeight")
                })
            }
        }
    });
