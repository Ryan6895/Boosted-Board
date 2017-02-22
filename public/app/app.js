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
})
