angular.module('boosted')
.controller('infomethod', function($scope, service, $state, geoService, $http) {

  service.getallcartItems().then(function(response){
    $scope.order_id = response.data[0].order_id;
    console.log('order.id', $scope.order_id);
    })

    $scope.paymentStatus = service.newPayment;
    console.log($scope.paymentStatus);

$scope.addAddress = function (email, firstname, lastname, street, city, country, state, zip, order_id) {
var strAddress = street + " " + city + " "+ state + " " + zip;


service.addAddress(strAddress, email, order_id).then(function(response) {
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
}
geoService.passAddress(objAddress);
$state.go('payment');
}

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
}

$scope.changeBorder = function (input){
  console.log('hi');
  for (var key in $scope.borderStyle) {
    $scope.borderStyle[key] = false;
  }
  $scope.borderStyle[input] = true;
  console.log($scope.borderStyle);
}

})
