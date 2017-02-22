angular.module('boosted')
.controller('blogitem', function($scope, service , $stateParams) {
  service.getOneBlog(parseInt($stateParams.blogid)).then(function(blog) {
   $scope.blog = blog.data;
})
})
