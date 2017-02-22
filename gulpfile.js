var gulp = require ('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var paths = {
  jsSource: ['public/app/**/*.js'],
  scssSource: ['public/app/**/*.scss']
};

gulp.task('scss', function() {
  gulp.src(paths.scssSource)
  .pipe(sass())
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('./public/dist'));
})

gulp.task('js', function() {
  gulp.src(paths.jsSource)
  .pipe(babel())
  .pipe(concat('bundle.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('./public/dist'))
})
gulp.task('watch', function () {
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.scssSource, ['scss']);
})
gulp.task('default', ['js', 'scss', 'watch']);
