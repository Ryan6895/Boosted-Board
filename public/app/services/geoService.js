angular.module('boosted')
.service('geoService', function($http, $q) {
  var self = this;
  this.searchMap = function(address) {
    console.log('service', address);
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address.street + address.city + address.state + address.country + '&key=AIzaSyAmGhz4T4vrSA6vMV3p7OPh3iqAmUdv9rk'
    }).then(function(response) {
      var response = response.data
    deferred.resolve(response)
    })
    return deferred.promise
  }
  this.newAddress;
  this.passAddress = function (objAddress){ 
    self.newAddress = objAddress;

  }

})
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAmGhz4T4vrSA6vMV3p7OPh3iqAmUdv9rk
//' + address.number + address.street + address.city + address.state + '
