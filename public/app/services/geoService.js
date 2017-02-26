angular.module('boosted')
.service('geoService', function($http, $q) {
  this.searchMap = function(address) {
    console.log('service', address);
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address.number + address.street + address.city + address.state + '&key=AIzaSyAmGhz4T4vrSA6vMV3p7OPh3iqAmUdv9rk'
    }).then(function(response) {
      var response = response.data
    deferred.resolve(response)
    })
    return deferred.promise
  }

})
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAmGhz4T4vrSA6vMV3p7OPh3iqAmUdv9rk
//' + address.number + address.street + address.city + address.state + '
