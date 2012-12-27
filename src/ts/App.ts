/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />

declare var ViewBlogsController:any;
declare var BlogManagerController;


var _app;
function getApp() : AngularModule {
    if(!_app) {
        _app =  angular.module("blog", []);
    }
    return _app;
}

/**
 * Define the default routes for the app
 */
(function(app : AngularModule) {
    app.config(function ($routeProvider : ng.RouteProvider) {
        $routeProvider
            .when("/", { redirectTo : "/viewblogs"})
            .otherwise({ templateUrl : "lost.html"});
    });
})(getApp());