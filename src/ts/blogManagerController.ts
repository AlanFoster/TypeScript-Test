/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />
/// <reference path="./app.ts" />

/**
 * Provide the controller operations under the BlogManager namespace
 */
module BlogManager {
    export interface Scope extends ng.Scope {
        blog : IBlog;
        save : () => void;
        remove : () => void;
    }

    export interface RouteParams {
        id : string;
    }

    export function CreateBlogController($scope:Scope, $location:ng.Location, blogDao:BlogDao) {
        $scope.save = function () {
            blogDao.createBlog($scope.blog.title, $scope.blog.message);
            $location.path("/");
        }
    }
    export function EditBlogController($scope:Scope, $location:ng.Location, $routeParams:RouteParams, blogDao:BlogDao) {
        var blogId = $routeParams.id;
        $scope.blog = blogDao.getBlog(blogId);
        $scope.save = function () {
            blogDao.updateBlog($scope.blog);
            $location.path("/");
        }
        $scope.remove = function () {
            blogDao.removeBlog(blogId);
            $location.path("/");
        }
    }
}

(function (app:AngularModule) {
    app.config(function ($routeProvider:ng.RouteProvider) {
        $routeProvider
            .when("/create", {controller: BlogManager.CreateBlogController, templateUrl: "./blogdetail.html"})
            .when("/edit/:id", {controller: BlogManager.EditBlogController, templateUrl: "./blogdetail.html"})
    });

    // Register as a controller in case we need to be used again
    app.controller("BlogManager.CreateBlogController", BlogManager.CreateBlogController);
    app.controller("BlogManager.EditBlogController", BlogManager.EditBlogController);
})(getApp());