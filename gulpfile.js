var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var connect = require('gulp-connect');

var move = function () {
    console.log('move');
    gulp.src('src/css/*')
        .pipe(gulp.dest('dist/css'));

    gulp.src("src/js/*")
        .pipe(babel())
        .pipe(gulp.dest("dist/js"));

    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
}
gulp.task("default",["move", "connect", "watch"]);
gulp.task("move", move);
gulp.task("connect", function () {
    connect.server({
        livereload: true
    });
});

gulp.task("watch", function () {
    watch(['src/js/*.js', 'src/css/*'], move);


});
