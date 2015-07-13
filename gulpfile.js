var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");

gulp.task("default", function () {
    gulp.src('src/css/*')
        .pipe(gulp.dest('dist/css'));

    gulp.src("src/js/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/js"));

    watch(['src/js/*.js', 'src/css/*'], function () {
        gulp.src('src/css/*')
            .pipe(gulp.dest('dist/css'));

        return gulp.src("src/js/*.js")
            .pipe(babel())
            .pipe(gulp.dest("dist/js"));
    });
});