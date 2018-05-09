var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('default', function() {
  return gulp.src('sass/*.scss')
  .pipe(watch('sass/*.scss'))
  .pipe(sass())
  .pipe(gulp.dest('dist'));
});
