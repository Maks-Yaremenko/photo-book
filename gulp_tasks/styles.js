'use strict';

const gulp    	 = require('gulp'),
	  sass	  	 = require('gulp-sass'),
	  notify	 = require('gulp-notify'),
	  sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {
	return function() {
        return gulp.src(options.src)
            //.pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', notify.onError())
            //.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest))
            
    };
}