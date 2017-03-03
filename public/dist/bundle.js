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
    controller: 'paymentmethod',
    templateUrl: 'public/app/routes/paymentmethod/paymentmethod.html'
  }).state('confirmation', {
    url: '/confirmation',
    controller: 'confirmation',
    templateUrl: 'public/app/routes/confirmation/confirmation.html'
  });
}).filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}]);
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
    if ($(window).width() > 1000) {
      if (winScroll > 2970 && winScroll < 4400) {
        $(".homeInfoPhoto").addClass("fadeIn");
        $(".homeInfoPhoto").removeClass("fadeOut");
      } else {
        $(".homeInfoPhoto").removeClass("fadeIn");
        $(".homeInfoPhoto").addClass("fadeOut");
      }
    }
    if (winScroll > 310) {
      $(".orangeLine").addClass("expandOrange");
      $(".blueLine").addClass("expandBlue");
      $(".mileageText").fadeIn();
      $(".mileageText").fadeIn();
    }
    if ($(window).width() > 1000) {
      if (winScroll > 2530) {
        $(".breezeContent").addClass("fadeOut");
      } else {
        $(".breezeContent").addClass("fadeIn");
        $(".breezeContent").removeClass("fadeOut");
      }
      if (winScroll > 1470) {
        $(".breezeContent").addClass("fadeIn");
      } else {
        $(".breezeContent").removeClass("fadeIn");
        $(".breezeContent").addClass("fadeOut");
      }
    }
    if (winScroll > 3395) {
      $(".remoteContent").addClass("fadeOut");
    } else {
      $(".remoteContent").addClass("fadeIn");
      $(".remoteContent").removeClass("fadeOut");
    }
    if (winScroll > 2315) {
      $(".remoteContent").addClass("fadeIn");
    } else {
      $(".remoteContent").removeClass("fadeIn");
      $(".remoteContent").addClass("fadeOut");
    }
    if (winScroll > 5425) {
      $(".breezetwoContent").addClass("fadeOut");
    } else {
      $(".breezetwoContent").addClass("fadeIn");
      $(".breezetwoContent").removeClass("fadeOut");
    }
    if (winScroll > 4265) {
      $(".breezetwoContent").addClass("fadeIn");
    } else {
      $(".breezetwoContent").removeClass("fadeIn");
      $(".breezetwoContent").addClass("fadeOut");
    }
    if (winScroll > 550) {
      $(".coverContent").addClass("fadeOut");
    } else {
      $(".coverContent").removeClass("fadeOut");
    }
  });
});
angular.module('boosted').service('geoService', function ($http, $q) {
  var self = this;
  this.searchMap = function (address) {
    console.log('service', address);
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address.street + address.city + address.state + address.country + '&key=AIzaSyAmGhz4T4vrSA6vMV3p7OPh3iqAmUdv9rk'
    }).then(function (response) {
      var response = response.data;
      deferred.resolve(response);
    });
    return deferred.promise;
  };
  this.newAddress;
  this.passAddress = function (objAddress) {
    self.newAddress = objAddress;
  };
});
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAmGhz4T4vrSA6vMV3p7OPh3iqAmUdv9rk
//' + address.number + address.street + address.city + address.state + '
angular.module('boosted').service('service', function ($http, stripe) {
  var self = this;
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
  this.getTotalQty = function () {
    return $http({
      method: 'GET',
      url: '/totalQty'
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
  this.addAddress = function (address, email, id) {
    return $http({
      method: 'PUT',
      url: '/address/update',
      data: {
        address: address,
        email: email,
        id: id
      }
    });
  };
  this.completeOrder = function () {
    return $http({
      method: 'GET',
      url: '/completeorder'
    });
  };
  this.completewithPayment = function () {
    return $http({
      method: 'GET',
      url: '/completepayment'
    });
  };
  this.checkItems = function (id) {
    return $http({
      method: 'GET',
      url: '/checkItems?id=' + id
    });
  };
  this.logout = function () {
    return $http({
      method: 'POST',
      url: '/api/logout'
    });
  };
  this.newPayment = 0;
  this.usepayment = function (value) {
    self.newPayment = value;
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
angular.module('boosted').directive('checkoutCart', function () {
  return {
    restrict: 'E',
    templateUrl: 'public/app/directives/checkoutCart/checkoutCart.html',
    controller: function ($scope, service) {
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
      $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.items.length; i++) {
          total += $scope.items[i].price * $scope.items[i].qty;
        }
        $scope.totalPrice = total;
        $scope.total = total;
      };
    },
    scope: {
      total: '=',
      paymentmethod: '='
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
angular.module('boosted').directive('guarantee', function () {
    return {
        restrict: 'E',
        templateUrl: 'public/app/directives/guarantee/guarantee.html',
        link: function (scope, elem, attrs) {
            console.log('hello');
        }
    };
});
angular.module('boosted').directive('help', function () {
    return {
        restrict: 'E',
        templateUrl: 'public/app/directives/help/help.html',
        link: function (scope, elem, attrs) {}
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
        $scope.getTotalQty = function () {
          service.getTotalQty().then(function (response) {
            $scope.totalQty = response.data[0].sum;
            console.log($scope.totalQty);
            if (!$scope.totalQty) {
              console.log('inner if');
              $scope.cartQty = false;
            } else {
              console.log('else if');
              $scope.cartQty = true;
            }
          }).catch(function (err) {
            $scope.cartQty = false;
          });
        };
        $scope.getTotalQty();
        $scope.$on('myCustomEvent', function (event, data) {
          $scope.getTotalQty();
          console.log(data);
        });
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

  $scope.updateCart = function () {
    service.getallcartItems().then(function (response) {
      $scope.items = response.data;
      if (!$scope.items.length) {
        $scope.emptyCart = true;
        $scope.fullCart = false;
      } else {
        $scope.emptyCart = false;
        $scope.fullCart = true;
      }
      $scope.getTotal();
    });
  };
  $scope.usePayment = function (value) {
    service.usepayment(value);
  };

  $scope.paymentsoff = function () {
    $scope.paymentAmount = 0;
    $scope.paymentButton = true;
    $scope.usePayment($scope.paymentAmount);
  };
  $scope.paymentsoff();

  $scope.paymentson = function () {
    service.gettotalPayments().then(function (response) {
      $scope.paymentAmount = response.data[0].sum;
      $scope.paymentButton = false;
      $scope.usePayment($scope.paymentAmount);
    });
  };

  $scope.updateCart();
  $scope.removeItem = function (id) {
    //console.log(id);
    service.removeItems(id).then(function (response) {
      $scope.updateCart();
      $scope.getTotal();
      $scope.$emit('myCustomEvent', 'success');
    });
    // $state.reload();
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
      $scope.updateCart();
      $scope.getTotal();
      $scope.$emit('myCustomEvent', 'success');
    });
  };
});
angular.module('boosted').controller('communityCtrl', function ($scope, service, $state, $http) {
  service.getblogs().then(function (response) {
    $scope.blogs = response.data;
    console.log($scope.blogs[0].blogid);
  });
});
angular.module('boosted').controller('confirmation', function ($scope, geoService, service, $state, $http) {

  $scope.getMap = function initMap(lat, lng) {
    var uluru = { lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  };

  $scope.address = geoService.newAddress;
  console.log($scope.address);

  geoService.searchMap($scope.address).then(function (coord) {
    $scope.location = coord;
    console.log($scope.location);
    $scope.lat = $scope.location.results[0].geometry.location.lat;
    $scope.lng = $scope.location.results[0].geometry.location.lng;
    $scope.getMap($scope.lat, $scope.lng);
  });
});
angular.module('boosted').controller('homeCtrl', function ($scope, service, $state, $timeout) {
  $scope.fadeIn = false;
  $timeout(function () {
    $scope.fadeIn = true;
  }, 200);
});
angular.module('boosted').controller('infomethod', function ($scope, service, $state, geoService, $http) {

  service.getallcartItems().then(function (response) {
    $scope.order_id = response.data[0].order_id;
    console.log('order.id', $scope.order_id);
  });

  $scope.paymentStatus = service.newPayment;
  console.log($scope.paymentStatus);

  $scope.addAddress = function (email, firstname, lastname, street, city, country, state, zip, order_id) {
    var strAddress = street + " " + city + " " + state + " " + zip;

    service.addAddress(strAddress, email, order_id).then(function (response) {
      console.log('successfully added');
    });

    var objAddress = {
      'street': street,
      'city': city,
      'state': state,
      'email': email,
      'firstname': firstname,
      'lastname': lastname,
      'zip': zip,
      'country': country
    };
    geoService.passAddress(objAddress);
    $state.go('payment');
  };

  $scope.borderStyle = {
    'email': false,
    'firstname': false,
    'lastname': false,
    'company': false,
    'address': false,
    'apt': false,
    'city': false,
    'country': false,
    'state': false,
    'zip': false,
    'phone': false
  };

  $scope.changeBorder = function (input) {
    console.log('hi');
    for (var key in $scope.borderStyle) {
      $scope.borderStyle[key] = false;
    }
    $scope.borderStyle[input] = true;
    console.log($scope.borderStyle);
  };
});
angular.module('boosted').controller('itemCtrl', function ($scope, service, $stateParams, $state) {
  service.getOneItem($stateParams.id).then(function (item) {
    $scope.item = item.data;
  });

  service.getUser().then(function (response) {
    if (!response) {
      $scope.loggedin = false;
    } else {
      $scope.loggedin = true;
    }
  });

  $scope.addItem = function () {
    service.checkItems($stateParams.id).then(function (response) {
      console.log('getcartItems', response);
      if (!response.data.length) {
        service.addtoCart($stateParams.id);
        $state.go('cart');
      } else {
        service.changeQuantity($stateParams.id);
        $state.go('cart');
      }
    });
  };
});
angular.module('boosted').controller('paymentmethod', function ($scope, service, $http, $state, stripe) {

  $scope.total = 0;

  service.gettotalPayments().then(function (response) {
    $scope.paymentAmount = response.data[0].sum;
  });

  $scope.paymentStatus = service.newPayment;

  $scope.payment = {};

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card).then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      $scope.totalDue = $scope.total - $scope.paymentStatus;
      console.log($scope.totalDue);
      return $http({
        method: 'POST',
        url: '/api/payment',
        data: {
          amount: $scope.totalDue,
          payment: payment,
          date: $scope.date,
          active: $scope.active
        }
      });
    }).then(function (payment) {
      console.log('successfully submitted payment for $', payment);
      //all here
      if ($scope.paymentStatus != 0) {
        service.completewithPayment().then(function (response) {
          console.log('completed with payment');
        }).then(function () {
          $state.go('confirmation');
        });
      } else {
        service.completeOrder().then(function (response) {
          console.log('completed without payment');
        }).then(function () {
          $state.go('confirmation');
        });
      }
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
angular.module('boosted').controller('payments', function ($scope, service, $state, $timeout, stripe, $http) {
  function getUser() {
    service.getUser().then(function (response) {
      $scope.user = response;
      service.gettotalPayments().then(function (response) {
        if (response.data[0].sum == null) {
          $scope.totalPayments = 0;
        } else {
          $scope.totalPayments = response.data[0].sum;
        }
        $scope.progress = {
          "width": 'calc(' + $scope.totalPayments / $scope.boardValue * 100 + '%' + ')',
          "background": "linear-gradient(to right, #f7dfb3 0%,#ef7b15 100%)",
          "height": "40px",
          "transition": ".25s",
          "border-radius": "8px"

        };
      });
    });
  }

  $scope.correctBar = function () {
    getUser();
  };
  $scope.totalPayments = 0;
  $scope.boardValue = '1499';

  getUser();
  $scope.date = new Date();
  $scope.active = 'True';
  $scope.logout = function () {
    service.logout().then(function (response) {
      console.log('successfully Logged Out');
      $state.go('home');
    });
  };

  //==========STRIPE==================
  $scope.payment = {};

  $scope.charge = function () {
    if ($scope.mockPrice > $scope.boardValue - $scope.totalPayments) {
      $scope.Alert = true;
    } else {
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
            user: $scope.user,
            active: $scope.active
          }
        });
      }).then(function (payment) {
        $scope.mockPrice = '';
        $scope.name = '';
        $scope.payment.card.number = '';
        $scope.payment.card.exp_month = '';
        $scope.payment.card.exp_year = '';
        $scope.payment.card.cvc = '';
        getUser();
        console.log('successfully submitted payment for $', payment);
        $scope.Alert = false;
      }).catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
          alert(err.message);
        } else {
          console.log('Other error occurred, possibly with your API', err.message);
          alert(err.message);
        }
      });
    }
  };
  //===END CTRL=======
});
angular.module('boosted').controller('reserve', function ($scope, service, $state, $timeout) {
  $scope.specs = 5;
  $scope.batteries = 1;
  $scope.specBattery = 6;
  $scope.changeBoard = function () {
    $scope.specBattery = $scope.specs + $scope.batteries;
    console.log($scope.specBattery);
  };
  $scope.addBoard = function () {
    if ($scope.specBattery === 6) {
      $scope.itemId = 18;
    } else if ($scope.specBattery === 7) {
      $scope.itemId = 17;
    } else if ($scope.specBattery === 11) {
      $scope.itemId = 16;
    } else {
      $scope.itemId = 15;
    }
    service.addtoCart($scope.itemId).then(function (response) {
      console.log(response);
    });
    $state.go('cart');
  };
  service.getUser().then(function (response) {
    if (!response) {
      $scope.account = false;
    } else {
      $scope.account = true;
    }
  });
});
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