angular.module('boosted')
.service('service', function($http, stripe) {
    this.getItems = function(num) {
        return $http({
          method: 'GET',
          url: '/store/' + num
        })
      }
      this.getOneItem = function(id) {
        return $http({
          method: 'GET',
          url: '/item/' + id
    })
  }
  this.getblogs = function(num) {
      return $http({
        method: 'GET',
        url: '/community'
      })
    }
    this.getOneBlog = function(blogid) {
      return $http({
        method: 'GET',
        url: '/blog/' + blogid
  })
}
this.sessionUser;
this.getUser = function() {
  return $http({
    method: 'GET',
    url: '/getUser'
}).then(function(response){
  this.sessionUser = response.data.passport.user;
  return this.sessionUser;
})
}

})
