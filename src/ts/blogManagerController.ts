/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />
/// <reference path="./app.ts" />

module BlogManagerController {
    export interface Scope extends ng.Scope {
        blog : IBlog;
        save : () => void;
    }

    export function CreateBlogController($scope : BlogManagerController.Scope, $location : ng.Location, blogDao : BlogDao) {
        $scope.save = function () {
            blogDao.addBlog($scope.blog.title, $scope.blog.message);
            $location.path("/");
        }
    }
    export function EditBlogController($scope : BlogManagerController.Scope, $location : ng.Location, blogDao : BlogDao) {
    }
}