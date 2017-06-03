'use strict';

const gulp    	 = require('gulp'),
	  sass	  	 = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {
	return function() {
        return gulp.src(options.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest));
    };
}