/// <reference path="../ts.def/angularjs/Angular.d.ts" />
/// <reference path="./BlogDao.ts" />

declare var ViewBlogsController:any;
declare var BlogManagerController;

// Defined here because of compile order issues..
interface IBlog {
    id : string;
    title : string;
    message : string;
    date : Date;
}

interface IBlogMap {
    [id : string] : IBlog;
}

class BlogDao {
    private blogs : IBlogMap;
    private static totalBlogCount : number = 0;

    constructor() {
        this.blogs =  {};
    }

    createBlog(title : string, message : string) : void {
        BlogDao.totalBlogCount++;
        var uniqueId = (BlogDao.totalBlogCount).toString();
        this.blogs[uniqueId] = {id : uniqueId, title : title, message : message, date : new Date()};
    }

    getBlogsAsArray() : IBlog[] {
        var blogs = this.blogs;
        return Object.getOwnPropertyNames(blogs).map((name) => blogs[name]);
    }
    getBlog(id : string) : IBlog {
        return this.blogs[id];
    }
    // May not be needed if getBlog returns a mutable object/reference
    updateBlog(blog : IBlog) : void {
        //get d
    }
    deleteBlog(id : string) : void {
        delete this.blogs[id];
    }
}
/***
 * Wrapped in an IIFE, as we don't want to clutter the global scope
 * Or trip over ourselves with multiple app declarations
 */
(function() {
    var blogDao = new BlogDao();

    var app : AngularModule = angular.module("blog", []);
    app.config(function ($routeProvider : ng.RouteProvider) {
        $routeProvider
            .when("/", {controller: ViewBlogsController, templateUrl: "./viewblogs.html"})
            .when("/create", {controller: BlogManagerController.CreateBlogController, templateUrl: "./blogdetail.html"})
            .when("/edit/:id", {controller: BlogManagerController.EditBlogController, templateUrl: "./blogdetail.html"})
    });

    app.factory("blogDao", function () {
        return blogDao;
    });
})();