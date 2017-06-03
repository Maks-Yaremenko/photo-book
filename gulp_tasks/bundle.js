'use strict';

const gulp  	 = require('gulp'),
      order 	 = require('gulp-order'),
      gulpMerge  = require('gulp-merge'),
      cached 	 = require('gulp-cached'),
      concat 	 = require('gulp-concat'),
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
        		gulp.src(options.tpl, { since: gulp.lastRun(options.task) })
        		.pipe(cached(options.taskTpl))
        		.pipe(remember(options.taskTpl))
                .pipe(ngtemplate({ module: 'templates', standalone: true })))
            .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(options.dst))
    };

};
