/// <reference path="./../ts.def/angularjs/angular-1.0.d.ts" />
declare var ViewBlogsController:any;
declare var BlogManagerController;

// Defined here because of compile order issues..
interface IBlog {
    title : string;
    message : string;
    date : Date;
}
class BlogDao {
    private blogs : IBlog[];
    constructor() {
        this.blogs = [];
    }
    addBlog(title : string, message : string) : void {
        this.blogs.push({title : title, message : message, date : new Date()});
    }
    getBlogs() : IBlog[] {
        return this.blogs;
    }
}

var blogDao = new BlogDao();

// Why do I have to do this? Why is IntellliJ not picking up types?
interface App {
    config : (...args:any[]) => void;
    factory : (...args:any[]) => void;
}

var app : App = angular.module("blog", []);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {controller: ViewBlogsController, templateUrl: "./viewblogs.html"})
        .when("/create", {controller: BlogManagerController.CreateBlogController, templateUrl: "./blogdetail.html"})
        .when("/edit", {controller: BlogManagerController.EditBlogController, templateUrl: "./blogdetail.html"})
});

//noinspection JSValidateTypes
app.factory("blogDao", function () {
    return blogDao;
});