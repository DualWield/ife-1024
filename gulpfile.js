var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var connect = require('gulp-connect');



gulp.task("connect", function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task("default", ["connect"]);


