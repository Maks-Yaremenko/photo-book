'use strict';

const gulp  	 = require('gulp'),
      order 	 = require('gulp-order'),
      gulpMerge  = require('gulp-merge'),
      cached 	 = require('gulp-cached'),
      concat 	 = require('gulp-concat'),
      minifyHTML = require('gulp-minify-html'),
      ngtemplate = require('gulp-ngtemplate'),
      remember   = require('gulp-remember'),
      sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {

    return function() {
        return gulpMerge(
                gulp.src(options.modules, { since: gulp.lastRun(options.task) })
                .pipe(cached(options.taskMod))
                .pipe(remember(options.taskMod)),
                gulp.src(options.all, { since: gulp.lastRun(options.task) })
                .pipe(cached(options.taskAll))
                .pipe(remember(options.taskAll)),
        		gulp.src(options.tpl)
                .pipe(minifyHTML({ comments:true, spare:true }))
                .pipe(ngtemplate({ module: 'templates'})))
            .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(options.dst))
    };

};
