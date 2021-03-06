angular.module('boosted')
.controller('paymentmethod', function($scope,service, $http, $state, stripe) {

  $scope.total = 0;

  service.gettotalPayments().then(function(response) {
    $scope.paymentAmount = response.data[0].sum;

  });

  $scope.paymentStatus = service.newPayment;

  $scope.payment = {};

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card)
    .then(function (response) {
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
      })
    })
    .then(function(payment) {
      console.log('successfully submitted payment for $', payment);
      //all here
      if ($scope.paymentStatus != 0){
      service.completewithPayment().then(function(response) {
          console.log('completed with payment');
      }).then(function() {
        $state.go('confirmation')
      });
    } else {
      service.completeOrder().then(function(response) {
          console.log('completed without payment');
      }).then(function() {
        $state.go('confirmation')
      });
    }
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
