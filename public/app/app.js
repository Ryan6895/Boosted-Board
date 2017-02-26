angular.module('boosted', ['ui.router', 'angular-stripe'])
.config(function($stateProvider, $urlRouterProvider, stripeProvider) {

  stripeProvider.setPublishableKey('pk_test_mNIkLeuMRFu9MYTe3q2cToOc')

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: 'public/app/routes/home/home.html'
  })
  .state('board', {
    url: '/board',
    controller: 'boardCtrl',
    templateUrl: 'public/app/routes/board/board.html'
  })
  .state('store', {
    url: '/store',
    controller: 'storeCtrl',
    templateUrl: 'public/app/routes/store/store.html'
  })
  .state('community', {
    url: '/community',
    controller: 'communityCtrl',
    templateUrl: 'public/app/routes/community/community.html'
  })
  .state('support', {
    url: '/support',
    controller: 'supportCtrl',
    templateUrl: 'public/app/routes/support/support.html'
  })
  .state('item', {
    url: '/item/:id',
    controller: 'itemCtrl',
    templateUrl: 'public/app/routes/itempage/item.html'
  })
  .state('blogitem', {
    url: '/blogitem/:blogid',
    controller: 'blogitem',
    templateUrl: 'public/app/routes/blogItem/blogitem.html'
  })
  .state('reserve', {
    url: '/reserve',
    controller: 'reserve',
    templateUrl: 'public/app/routes/reserveNow/reserve.html'
  })
  .state('payments', {
    url: '/payments',
    controller: 'payments',
    templateUrl: 'public/app/routes/payments/payments.html'
  })
  .state('cart', {
    url: '/cart',
    controller: 'cartCtrl',
    templateUrl: 'public/app/routes/cart/cart.html'
  })
  .state('checkout', {
    url: '/checkout',
    controller: 'infomethod',
    templateUrl: 'public/app/routes/infoMethod/infomethod.html'
  })
  .state('payment', {
    url: '/payment',
    controller: 'paymentmethod',
    templateUrl: 'public/app/routes/paymentmethod/paymentmethod.html'
  })
  .state('confirmation', {
    url: '/confirmation',
    controller: 'confirmation',
    templateUrl: 'public/app/routes/confirmation/confirmation.html'
  })
})
