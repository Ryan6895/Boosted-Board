angular.module('boosted')
.controller('payments', function($scope,service, $state, $timeout, stripe, $http) {
function getUser(){
  service.getUser().then(function(response) {
    $scope.user = response;
      service.gettotalPayments().then(function(response) {
        $scope.totalPayments = response.data[0].sum;
        $scope.progress = {
          "width": 'calc('+(($scope.totalPayments / $scope.boardValue) * 100)+'%'+')',
          "background": "linear-gradient(to right, #f7dfb3 0%,#ef7b15 100%)",
          "height" : "40px",
          "transition": ".25s",
          "border-radius": "8px"

        }
      })
    })
}

$scope.correctBar = function() {
  getUser();
}

$scope.addBoard = function() {

}

getUser();
$scope.date = new Date();
$scope.active = 'True';
$scope.logout = function () {
  service.logout().then(function(response){
    console.log('successfully Logged Out');
    $state.go('home');
  })
}

//==========STRIPE==================
  $scope.payment = {};

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card)
    .then(function (response) {
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
      })
    })
    .then(function(payment) {
      $scope.mockPrice = '';
      $scope.name = '';
      $scope.payment.card.number = '';
      $scope.payment.card.exp_month = '';
      $scope.payment.card.exp_year = '';
      $scope.payment.card.cvc = '';
      getUser();
      console.log('successfully submitted payment for $', payment);
    })
    .catch(function (err) {
       if (err.type && /^Stripe/.test(err.type)) {
         console.log('Stripe error: ', err.message);
         alert(err.message)
       }
       else {
         console.log('Other error occurred, possibly with your API', err.message);
         alert(err.message)
       }
     });
 };
 //===END CTRL=======
});
