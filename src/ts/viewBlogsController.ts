function ViewBlogsController($scope, blogDao) {
    $scope.getBlogs = function() {
        return blogDao.getBlogsAsArray();
    }
};