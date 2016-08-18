/**
 * Created by izabela on 17/08/16.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require("gulp-minify-css");
var clean = require('gulp-clean');

var paths = {
    'bower':'./bower_components',
    'assets':"./assets",
    'libs': [
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/ng-dialog/js/ngDialog.min.js',
        './bower_components/angularfire/dist/angularfire.min.js',
        './bower_components/firebase/firebase.js'
    ],
    'libs_css' :['./bower_components/ng-dialog/css/ngDialog.min.css',
        './bower_components/ng-dialog/css/ngDialog-theme-default.min.css',],
    'destination_libs' : './app/libs',
    'destination_libs_css' : './app/styles/css',

}


gulp.task('styles', function(){
    return gulp.src([
        paths.assets + '/_scss/main.scss'
    ])
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(minifyCss())                                         // Make the file titchy tiny small
        .pipe(gulp.dest('./app/styles/css'))

});

// Delete the directory with libraries:
gulp.task('clean_libs', function() {
    return gulp.src( paths.destination_libs )
        .pipe(clean());
});

gulp.task('copy', ['clean_libs'], function() {
        gulp.src(paths.libs)
            .pipe(gulp.dest( paths.destination_libs ));
    }
)

gulp.task('copy_css',  function() {
        gulp.src(paths.libs_css)
            .pipe(gulp.dest( paths.destination_libs_css ));
    }
);




gulp.task('watch', function(){
    gulp.watch('./assets/styles/**/*.sccs', ['styles']);
    //gulp.watch('./assets/styles/**/*.js', ['scripts'])
});

