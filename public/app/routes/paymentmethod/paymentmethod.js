angular.module('boosted')
.controller('paymentmethod', function($scope,service, $http, $state, stripe) {

  $scope.total = 0;

  service.gettotalPayments().then(function(response) {
    $scope.paymentAmount = response.data[0].sum;

  });


  $scope.payment = {};

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card)
    .then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      $scope.totalDue = $scope.total - $scope.paymentAmount;
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
      })
    })
    .then(function(payment) {
      console.log('successfully submitted payment for $', payment);
      //all here
      service.completeOrder().then(function(response) {
          console.log(response);
      }).then(function() {
        state.go('confirmation')
      });
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
