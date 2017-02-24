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
    url: '/auth/me'
}).then(function(response){
  this.sessionUser = response.data;
  return this.sessionUser;
})
}
this.addemail = function(email) {
  return $http({
    method: 'POST',
    url: '/addEmail',
    data: { email: email}
})
}
this.addtoCart = function (item) {
  return $http({
    method: 'POST',
    url: '/addtoCart',
    data: {product: item}
  })
}
this.getallcartItems = function () {
  return $http({
    method: 'GET',
    url: '/cart'
  })
}
this.removeItems = function (itemid) {
  console.log(itemid);
  return $http({
    method: 'DELETE',
    url: '/cart?id=' + itemid
  })
}
this.changeQuantity = function (id){
  return $http({
  method: 'PUT',
  url: '/item?id=' + id
  })
}
this.getcartItems = function(id) {
  return $http({
    method: 'GET',
    url: '/cartItems?id=' + id
})
}
})
