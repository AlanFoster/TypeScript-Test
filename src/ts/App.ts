/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />

/***
 * Instantiate the app module and offer a getter method for the object for reuse/abstraction
 */
var _app;
function getApp() : AngularModule {
    if(!_app) {
        _app =  angular.module("blog", ["ui"]);
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

/**
* Create a global config object available in all scopes
*/
(function (app) {
	app.run(function($rootScope) {
		$rootScope.GlobalConfig = {
			// Overrides all existing codeMirror config (Dynamically configurable)
			codeMirror: {
				theme: "monokai",
				lineNumbers: true,
				wordWrap: true,
				tabSize: 2,
				onChange: function (codemirror) {
					console.log("Codemirror changed");
				}
			}
		}
	});
})(getApp());
