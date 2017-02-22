angular.module('boosted')
    .directive('boardCaro', function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                $('.slider-for').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    fade: true,
                    asNavFor: '.slider-nav',

                });
                $('.slider-nav').slick({
                    slidesToShow: 1.667,
                    slidesToScroll: 1,
                    asNavFor: '.slider-for',
                    dots: true,
                    centerMode: true,
                    focusOnSelect: true,

                });
            }
        }
    });
