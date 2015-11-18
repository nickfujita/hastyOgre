'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var rename = require("gulp-rename");

var paths = {
  scripts: ['client/app/**/*.js'],
  es6scripts: ['server/cron/cronWorker.es6.js']
};

gulp.task('babel', function() {
 return gulp.src('server/cron/cronWorker.es6.js')
 .pipe(watch('server/cron/cronWorker.es6.js'))
 .pipe(babel({
      presets: ['es2015']
  }))
 .pipe(rename('cronWorker.js'))
  .pipe(gulp.dest('server/cron/'));
});