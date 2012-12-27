/// <reference path="./app.ts" />

/**
 * Provide the controller operations under the BlogManager namespace
 */
module BlogManagerController {
    export interface Scope extends ng.Scope {
        getBlogs : () => void;
    }

    export function ViewBlogsController($scope : Scope, blogDao : BlogDao) {
        $scope.getBlogs = function () {
            return blogDao.getBlogsAsArray();
        }
    };
}

/**
 * Register our routing requirements for this controller
 */
(function (app:AngularModule) {
    app.config(function ($routeProvider:ng.RouteProvider) {
        $routeProvider
            .when("/viewblogs", { controller: BlogManagerController.ViewBlogsController, templateUrl: "./viewblogs.html"})
    });

    // Register as a controller in case we need to be used again
    app.controller("BlogManager.ViewBlogsController", BlogManagerController.ViewBlogsController);
})(getApp());