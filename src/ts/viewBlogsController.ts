/// <reference path="./app.ts" />
(function(app : AngularModule) {
    app.config(function ($routeProvider : ng.RouteProvider) {
        $routeProvider
            .when("/viewblogs", { controller: ViewBlogsController, templateUrl: "./viewblogs.html"})
    });

    function ViewBlogsController($scope, blogDao) {
        $scope.getBlogs = function() {
            return blogDao.getBlogsAsArray();
        }
    };

    // Register as a controller
    app.controller("ViewBlogsController", ViewBlogsController);
})(getApp());