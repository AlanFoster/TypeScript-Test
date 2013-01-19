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

function FooController($rootScope, $scope) {
	var globalCodeMirrorOptions = $rootScope.GlobalConfig.codeMirror;
	var codeMirrorOptions = {};
	var customCodeMirrorOptions = {
		// ...
	};

	// Combine the Options with the overriding config options
	$scope.codeMirrorOptions = angular.extend(codeMirrorOptions, globalCodeMirrorOptions, customCodeMirrorOptions);
	
	// Watch for parent changes
	// TODO AngularJs should be able to do this automatically most likely?
	$rootScope.$watch("GlobalConfig.codeMirror", function(newGlobalCodeMirrorOptions, oldValue) {
		$scope.codeMirrorOptions = angular.extend($scope.codeMirrorOptions, newGlobalCodeMirrorOptions);
	}, true);
}


/**
* Create a global config object available in all scopes
*/
(function (app) {
	app.run(function($rootScope) {
		$rootScope.GlobalConfig = {
			// Overrides all existing codeMirror config (Dynamically configurable)
			codeMirror: {
			mode: {name: "xml", alignCDATA: true},
				//theme: "monokai",
				lineNumbers: true,
				wordWrap: true,
				tabSize: 2,
				onChange: function (codeMirror) {
					console.log("CodeMirror changed");
				}
			}
		}
	});
})(getApp());

