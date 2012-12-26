/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />
/// <reference path="./app.ts" />

module BlogManagerController {
    export interface Scope extends ng.Scope {
        blog : IBlog;
        save : () => void;
    }

    export interface RouteParams {
        id : string;
    }

    export function CreateBlogController($scope : BlogManagerController.Scope, $location : ng.Location, blogDao : BlogDao) {
        $scope.save = function () {
            blogDao.createBlog($scope.blog.title, $scope.blog.message);
            $location.path("/");
        }
    }
    export function EditBlogController($scope : BlogManagerController.Scope, $location : ng.Location, $routeParams : RouteParams, blogDao : BlogDao) {
        var blogId = $routeParams.id;
        $scope.blog = blogDao.getBlog(blogId);
        $scope.save = function () {
            blogDao.updateBlog($scope.blog);
            $location.path("/");
        }
    }
}