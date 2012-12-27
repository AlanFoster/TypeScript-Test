/// <reference path="./app.ts" />

interface IBlog {
    id : string;
    title : string;
    message : string;
    date : Date;
}

interface IBlogMap {
    [id : string] : IBlog;
}

/**
 * In memory blog data access object - IE if a page is refreshed the blogs will be lost
 * Provides basic CRUD operations
 */
class BlogDao {
    private blogs:IBlogMap;
    private static totalBlogCount:number = 0;

    constructor() {
        this.blogs = {};
    }

    createBlog(title:string, message:string):void {
        BlogDao.totalBlogCount++;
        var uniqueId = (BlogDao.totalBlogCount).toString();
        this.blogs[uniqueId] = {id: uniqueId, title: title, message: message, date: new Date()};
    }

    getBlogsAsArray():IBlog[] {
        var blogs = this.blogs;
        return Object.getOwnPropertyNames(blogs).map((name) => blogs[name]);
    }

    getBlog(id:string):IBlog {
        return this.blogs[id];
    }

    updateBlog(blog:IBlog):void {
        this.blogs[blog.id] = blog;
    }

    removeBlog(id:string):void {
        delete this.blogs[id];
    }
}

/***
 *  Let the BlogDao be available for dependency injection for controllers
 */
(function (app) {
    var blogDao = new BlogDao();
    app.factory("blogDao", function () {
        return blogDao;
    });
})(getApp());