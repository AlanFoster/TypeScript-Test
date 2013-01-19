/**
* In memory blog data access object - IE if a page is refreshed the blogs will be lost
* Provides basic CRUD operations
*/
var BlogDao = (function () {
    function BlogDao() {
        this.blogs = {
        };
    }
    BlogDao.totalBlogCount = 0;
    BlogDao.prototype.createBlog = function (title, message) {
        BlogDao.totalBlogCount++;
        var uniqueId = (BlogDao.totalBlogCount).toString();
        this.blogs[uniqueId] = {
            id: uniqueId,
            title: title,
            message: message,
            date: new Date()
        };
    };
    BlogDao.prototype.getBlogsAsArray = function () {
        var blogs = this.blogs;
        return Object.getOwnPropertyNames(blogs).map(function (name) {
            return blogs[name];
        });
    };
    BlogDao.prototype.getBlog = function (id) {
        return this.blogs[id];
    };
    BlogDao.prototype.updateBlog = function (blog) {
        this.blogs[blog.id] = blog;
    };
    BlogDao.prototype.removeBlog = function (id) {
        delete this.blogs[id];
    };
    return BlogDao;
})();
/***
*  Let the BlogDao be available for dependency injection for controllers
*/
(function (app) {
    var blogDao = new BlogDao();
    app.factory("blogDao", function () {
        return blogDao;
    });
})(getApp());
/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />
/***
* Instantiate the app module and offer a getter method for the object for reuse/abstraction
*/
var _app;
function getApp() {
    if(!_app) {
        _app = angular.module("blog", [
            "ui"
        ]);
    }
    return _app;
}
/***
* Define the default routes for the app
*/
(function (app) {
    app.config(function ($routeProvider) {
        $routeProvider.when("/", {
            redirectTo: "/viewblogs"
        }).otherwise({
            templateUrl: "lost.html"
        });
    });
})(getApp());
/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />
/// <reference path="./app.ts" />
/**
* Provide the controller operations under the BlogManager namespace
*/
var BlogManager;
(function (BlogManager) {
    function CreateBlogController($scope, $location, blogDao) {
        $scope.save = function () {
            blogDao.createBlog($scope.blog.title, $scope.blog.message);
            $location.path("/");
        };
    }
    BlogManager.CreateBlogController = CreateBlogController;
    function EditBlogController($scope, $location, $routeParams, blogDao) {
        var blogId = $routeParams.id;
        $scope.blog = blogDao.getBlog(blogId);
        $scope.save = function () {
            blogDao.updateBlog($scope.blog);
            $location.path("/");
        };
        $scope.remove = function () {
            blogDao.removeBlog(blogId);
            $location.path("/");
        };
    }
    BlogManager.EditBlogController = EditBlogController;
})(BlogManager || (BlogManager = {}));
(function (app) {
    app.config(function ($routeProvider) {
        $routeProvider.when("/create", {
            controller: BlogManager.CreateBlogController,
            templateUrl: "./blogdetail.html"
        }).when("/edit/:id", {
            controller: BlogManager.EditBlogController,
            templateUrl: "./blogdetail.html"
        });
    });
    // Register as a controller in case we need to be used again
    app.controller("BlogManager.CreateBlogController", BlogManager.CreateBlogController);
    app.controller("BlogManager.EditBlogController", BlogManager.EditBlogController);
})(getApp());
/// <reference path="./app.ts" />
/**
* Provide the controller operations under the BlogManager namespace
*/
var BlogManagerController;
(function (BlogManagerController) {
    function ViewBlogsController($scope, blogDao) {
        $scope.getBlogs = function () {
            return blogDao.getBlogsAsArray();
        };
    }
    BlogManagerController.ViewBlogsController = ViewBlogsController;
    ; ;
})(BlogManagerController || (BlogManagerController = {}));
/**
* Register our routing requirements for this controller
*/
(function (app) {
    app.config(function ($routeProvider) {
        $routeProvider.when("/viewblogs", {
            controller: BlogManagerController.ViewBlogsController,
            templateUrl: "./viewblogs.html"
        });
    });
    // Register as a controller in case we need to be used again
    app.controller("BlogManager.ViewBlogsController", BlogManagerController.ViewBlogsController);
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

