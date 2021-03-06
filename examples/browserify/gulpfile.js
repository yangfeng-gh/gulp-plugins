'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('js', function () {
  // 在一个基础的 task 中创建一个 browserify 实例
  var b = browserify({
    entries: './entry.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer()) // Error: gulp-sourcemaps-init: Streaming not supported，需要转换为buffer类型
    .pipe(sourcemaps.init({loadMaps: true}))
        // 在这里将转换任务加入管道
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['js']);