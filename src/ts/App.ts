/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />

/***
 * Instantiate the app module and offer a getter method for the object for reuse/abstraction
 */
var _app;
function getApp() : AngularModule {
    if(!_app) {
        _app =  angular.module("blog", []);
    }
    return _app;
}

/***
 * Define the default routes for the app
 */
(function(app : AngularModule) {
    app.config(function ($routeProvider : ng.RouteProvider) {
        $routeProvider
            .when("/", { redirectTo : "/viewblogs"})
            .otherwise({ templateUrl : "lost.html"});
    });
})(getApp());