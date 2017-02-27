angular.module('boosted')
.controller('infomethod', function($scope, service, $state, geoService, $http) {

  service.getallcartItems().then(function(response){
    $scope.order_id = response.data[0].order_id;
    console.log('order.id', $scope.order_id);
    })

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
})
