var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var connect = require('gulp-connect');
<<<<<<< HEAD

gulp.task("default",["move", "connect", "watch"]);
gulp.task("move", function () {
=======
gulp.task("watch", function () {
>>>>>>> c19f41b7b6d1cc6017d0225209788e96f0de9c85
    gulp.src('src/css/*')
        .pipe(gulp.dest('dist/css'));

    gulp.src("src/js/*")
        .pipe(babel())
        .pipe(gulp.dest("dist/js"));

    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});
gulp.task("connect", function () {
    connect.server({
        livereload: true
    });
});

gulp.task("watch", function () {
    watch(['src/js/*.js', 'src/css/*'], function () {
        gulp.src('src/css/*')
            .pipe(gulp.dest('dist/css'));

        return gulp.src("src/js/*.js")
            .pipe(babel())
            .pipe(gulp.dest("dist/js"));
    });
<<<<<<< HEAD

});
=======
});

gulp.task("connect", function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task("default", ["watch", "connect"]);
>>>>>>> c19f41b7b6d1cc6017d0225209788e96f0de9c85
