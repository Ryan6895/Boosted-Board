angular.module('boosted')
.controller('confirmation', function($scope, geoService, service, $state, $http) {

  $scope.getMap = function initMap(lat, lng) {
    var uluru = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

$scope.address = geoService.newAddress;

  geoService.searchMap($scope.address).then(function(coord) {
      $scope.location = coord;
      console.log($scope.location);
      $scope.lat = $scope.location.results[0].geometry.location.lat;
      $scope.lng = $scope.location.results[0].geometry.location.lng;
      $scope.getMap($scope.lat, $scope.lng);
})
})
