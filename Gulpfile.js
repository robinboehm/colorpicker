'use strict';

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  ngmin = require('gulp-ngmin'),
  concat = require('gulp-concat'),
  ngHtml2Js = require('gulp-ng-html2js'),
  minifyHtml = require('gulp-minify-html');


var componentName = require('./bower.json').name;
var paths = {
  dist: './'
};

// Clean public
gulp.task('clean', function () {
  return gulp.src(paths.dist + componentName + '*.{js,css}', {read: false})
    .pipe(clean());
});

// Build
gulp.task('default', ['clean', 'build']);

gulp.task('build', ['assets', 'styles', 'scripts', 'templates']);

gulp.task('scripts', [], function () {

  return gulp.src(['src/scripts/module.js', 'src/scripts/**/*.js'])
    .pipe(ngmin())
    .pipe(concat(componentName + '.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(concat(componentName + '.min.js'))
    .pipe(gulp.dest(paths.dist));

});

gulp.task('styles', [], function () {

  return gulp.src('src/styles/**/*.css')
    .pipe(concat(componentName + '.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe(minifyCss())
    .pipe(concat(componentName + '.min.css'))
    .pipe(gulp.dest(paths.dist));

});

gulp.task('templates', [], function () {

  return gulp.src('src/views/**/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: componentName,
      prefix: 'views/'
    }))
    .pipe(concat(componentName + '.templates.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(concat(componentName + '.templates.min.js'))
    .pipe(gulp.dest(paths.dist));

});


gulp.task('assets', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest(paths.dist + 'images'));
});
