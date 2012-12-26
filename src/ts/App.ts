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

var app : AngularModule = angular.module("blog", []);
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