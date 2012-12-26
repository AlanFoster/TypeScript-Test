/// <reference path="./../ts.def/angularjs/angular-1.0.d.ts" />
/// <reference path="app.ts" />

module BlogManagerController {
    // Reference types seem to be ignored...
    // it complains about unresolved type ILocationService when I use ' $location : ILocationService' for some reason?
    export function CreateBlogController($scope, $location, blogDao:BlogDao) {
        $scope.save = function () {
            blogDao.addBlog($scope.blog.title, $scope.blog.message);
            $location.path("/");
        }
    }
    export function EditBlogController($scope, $location, blogDao) {
    }
}