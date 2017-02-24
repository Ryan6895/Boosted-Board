angular.module('boosted', ['ui.router', 'angular-stripe']).config(function ($stateProvider, $urlRouterProvider, stripeProvider) {

  stripeProvider.setPublishableKey('pk_test_mNIkLeuMRFu9MYTe3q2cToOc');

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: 'public/app/routes/home/home.html'
  }).state('board', {
    url: '/board',
    controller: 'boardCtrl',
    templateUrl: 'public/app/routes/board/board.html'
  }).state('store', {
    url: '/store',
    controller: 'storeCtrl',
    templateUrl: 'public/app/routes/store/store.html'
  }).state('community', {
    url: '/community',
    controller: 'communityCtrl',
    templateUrl: 'public/app/routes/community/community.html'
  }).state('support', {
    url: '/support',
    controller: 'supportCtrl',
    templateUrl: 'public/app/routes/support/support.html'
  }).state('item', {
    url: '/item/:id',
    controller: 'itemCtrl',
    templateUrl: 'public/app/routes/itempage/item.html'
  }).state('blogitem', {
    url: '/blogitem/:blogid',
    controller: 'blogitem',
    templateUrl: 'public/app/routes/blogItem/blogitem.html'
  }).state('reserve', {
    url: '/reserve',
    controller: 'reserve',
    templateUrl: 'public/app/routes/reserveNow/reserve.html'
  }).state('payments', {
    url: '/payments',
    controller: 'payments',
    templateUrl: 'public/app/routes/payments/payments.html'
  }).state('cart', {
    url: '/cart',
    controller: 'cartCtrl',
    templateUrl: 'public/app/routes/cart/cart.html'
  }).state('checkout', {
    url: '/checkout',
    controller: 'infomethod',
    templateUrl: 'public/app/routes/infoMethod/infomethod.html'
  }).state('payment', {
    url: '/payment',
    controller: 'payment',
    templateUrl: 'public/app/routes/paymentmethod/paymentmethod.html'
  }).state('confirmation', {
    url: '/confirmation',
    controller: 'confirmation',
    templateUrl: 'public/app/routes/confirmation/confirmation.html'
  });
});
$(document).ready(function () {
  $(window).scroll(function () {
    let winScroll = $(this).scrollTop();
    console.log(winScroll);
    if (winScroll > 530) {
      $(".homeCoverInfo").addClass("fadeOut");
    } else {
      $(".homeCoverInfo").addClass("fadeIn");
      $(".homeCoverInfo").removeClass("fadeOut");
    }
    if (winScroll > 1400) {
      $(".homeGrayContainer").addClass("fadeOut");
    } else {
      $(".homeGrayContainer").addClass("fadeIn");
      $(".homeGrayContainer").removeClass("fadeOut");
    }
    if (winScroll > 530) {
      $(".homeGrayContainer").addClass("fadeIn");
    } else {
      $(".homeGrayContainer").removeClass("fadeIn");
      $(".homeGrayContainer").addClass("fadeOut");
    }
    if (winScroll > 2970 && winScroll < 4400) {
      $(".homeInfoPhoto").addClass("fadeIn");
      $(".homeInfoPhoto").removeClass("fadeOut");
    } else {
      $(".homeInfoPhoto").removeClass("fadeIn");
      $(".homeInfoPhoto").addClass("fadeOut");
    }
    if (winScroll > 310) {
      $(".orangeLine").addClass("expandOrange");
      $(".blueLine").addClass("expandBlue");
      $(".mileageText").fadeIn();
      $(".mileageText").fadeIn();
    }
  });
});
angular.module('boosted').service('service', function ($http, stripe) {
  this.getItems = function (num) {
    return $http({
      method: 'GET',
      url: '/store/' + num
    });
  };
  this.getOneItem = function (id) {
    return $http({
      method: 'GET',
      url: '/item/' + id
    });
  };
  this.getblogs = function (num) {
    return $http({
      method: 'GET',
      url: '/community'
    });
  };
  this.getOneBlog = function (blogid) {
    return $http({
      method: 'GET',
      url: '/blog/' + blogid
    });
  };
  this.sessionUser;
  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (response) {
      this.sessionUser = response.data;
      return this.sessionUser;
    });
  };
  this.addemail = function (email) {
    return $http({
      method: 'POST',
      url: '/addEmail',
      data: { email: email }
    });
  };
  this.addtoCart = function (item) {
    return $http({
      method: 'POST',
      url: '/addtoCart',
      data: { product: item }
    });
  };
  this.getallcartItems = function () {
    return $http({
      method: 'GET',
      url: '/cart'
    });
  };
  this.removeItems = function (itemid) {
    console.log(itemid);
    return $http({
      method: 'DELETE',
      url: '/cart?id=' + itemid
    });
  };
  this.changeQuantity = function (id) {
    return $http({
      method: 'PUT',
      url: '/item?id=' + id
    });
  };
  this.getcartItems = function (id) {
    return $http({
      method: 'GET',
      url: '/cartItems?id=' + id
    });
  };
  this.gettotalPayments = function () {
    return $http({
      method: 'GET',
      url: '/payments'
    });
  };
  this.updateQty = function (id, qty) {
    return $http({
      method: 'PUT',
      url: '/item/update',
      data: {
        id: id,
        qty: qty
      }
    });
  };
});
angular.module('boosted').directive('boardCaro', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.slider-nav'

            });
            $('.slider-nav').slick({
                slidesToShow: 1.667,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: true,
                centerMode: true,
                focusOnSelect: true

            });
        }
    };
});
angular.module('boosted').directive('carousel', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            });
            $('.slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                autoplay: true,
                autoplaySpeed: 3000
            });
        }
    };
});
angular.module('boosted').directive('footerView', function () {
    return {
        restrict: 'E',
        templateUrl: 'public/app/directives/footer/footer.html',
        controller: function ($scope, service) {
            $scope.addEmail = function (email) {
                service.addemail(email);
            };
        },
        link: function (scope, elem, attrs) {}
    };
});
angular.module('boosted').directive('help', function () {
    return {
        restrict: 'E',
        templateUrl: 'public/app/directives/help/help.html',
        link: function (scope, elem, attrs) {}
    };
});
angular.module('boosted').directive('guarantee', function () {
    return {
        restrict: 'E',
        templateUrl: 'public/app/directives/guarantee/guarantee.html',
        link: function (scope, elem, attrs) {
            console.log('hello');
        }
    };
});
angular.module('boosted').directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'public/app/directives/navBar/navBar.html',
        controller: function ($scope, service) {
            service.getUser().then(function (response) {
                if (!response) {
                    $scope.account = false;
                } else {
                    $scope.account = true;
                }
                //add button login and account depending if logged in
            });
        },
        link: function (scope, elem, attrs) {

            $('.navDrop').on('click', function () {
                $('.navDropDown').toggleClass("navDropHeight");
            });
        }
    };
});
angular.module('boosted').controller('blogitem', function ($scope, service, $stateParams) {
  service.getOneBlog(parseInt($stateParams.blogid)).then(function (blog) {
    $scope.blog = blog.data;
  });
});
angular.module('boosted').controller('boardCtrl', function ($scope, service, $state) {});
angular.module('boosted').controller('cartCtrl', function ($scope, service, $state) {
  $scope.reloadRoute = function () {
    $state.reload();
  };
  service.getallcartItems().then(function (response) {
    $scope.items = response.data;
    console.log('$scope.items', $scope.items);
    if (!$scope.items.length) {
      $scope.emptyCart = true;
      $scope.fullCart = false;
    } else {
      $scope.emptyCart = false;
      $scope.fullCart = true;
    }
    $scope.getTotal();
  });
  service.gettotalPayments().then(function (response) {
    $scope.paymentAmount = response.data[0].sum;
  });
  $scope.removeItem = function (id) {
    //console.log(id);
    service.removeItems(id);
    $state.reload();
  };
  $scope.getTotal = function () {
    var total = 0;
    for (var i = 0; i < $scope.items.length; i++) {
      total += $scope.items[i].price * $scope.items[i].qty;
    }
    $scope.totalPrice = total;
  };
  $scope.updateItem = function (id, qty) {
    service.updateQty(id, qty).then(function (response) {
      $scope.getTotal();
    });
  };
});
angular.module('boosted').controller('communityCtrl', function ($scope, service, $state, $http) {
  service.getblogs().then(function (response) {
    $scope.blogs = response.data;
    console.log($scope.blogs[0].blogid);
  });
});
angular.module('boosted').controller('confirmation', function ($scope, service, $state, $http) {});
angular.module('boosted').controller('homeCtrl', function ($scope, service, $state, $timeout) {
  $scope.fadeIn = false;
  $timeout(function () {
    $scope.fadeIn = true;
  }, 200);
});
angular.module('boosted').controller('infomethod', function ($scope, service, $state, $http) {});
angular.module('boosted').controller('itemCtrl', function ($scope, service, $stateParams) {
  service.getOneItem($stateParams.id).then(function (item) {
    $scope.item = item.data;
    console.log(item);
  });
  $scope.addItem = function () {
    service.getcartItems($stateParams.id).then(function (response) {
      if (!response.data[0]) {
        service.addtoCart($stateParams.id);
      } else {
        service.changeQuantity($stateParams.id);
      }
    });
  };
});
angular.module('boosted').controller('paymentmethod', function ($scope, service, $state) {});
angular.module('boosted').controller('payments', function ($scope, service, $state, $timeout, stripe, $http) {
  function getUser() {
    service.getUser().then(function (response) {
      $scope.user = response;
      service.gettotalPayments().then(function (response) {
        $scope.totalPayments = response.data[0].sum;
      });
    });
  }

  getUser();
  $scope.date = new Date();

  //==========STRIPE==================
  $scope.payment = {};

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card).then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;

      return $http({
        method: 'POST',
        url: '/api/payment',
        data: {
          amount: $scope.mockPrice,
          payment: payment,
          date: $scope.date,
          user: $scope.user
        }
      });
    }).then(function (payment) {
      console.log('successfully submitted payment for $', payment);
    }).catch(function (err) {
      if (err.type && /^Stripe/.test(err.type)) {
        console.log('Stripe error: ', err.message);
        alert(err.message);
      } else {
        console.log('Other error occurred, possibly with your API', err.message);
        alert(err.message);
      }
    });
  };
  //===END CTRL=======
});
angular.module('boosted').controller('reserve', function ($scope, service, $state, $timeout) {});
angular.module('boosted').controller('storeCtrl', function ($scope, service, $state, $http, $location, $anchorScroll) {
  service.getItems(2).then(function (response) {
    $scope.Items2 = response.data;
    console.log($scope.Items2);
  });
  service.getItems(1).then(function (results) {
    $scope.Items1 = results.data;
    console.log($scope.Items1);
  });
  $scope.gotoAnchor = function (param) {
    $location.hash(param);
    $anchorScroll();
  };
});