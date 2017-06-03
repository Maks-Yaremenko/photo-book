'use strict';

const gulp    	 = require('gulp'),
	  sass	  	 = require('gulp-sass'),
	  notify  	 = require('gulp-notify'),
	  combine 	 = require('stream-combiner2').obj,
	  sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {
	return function() {
        return combine(
            gulp.src(options.src),
            sourcemaps.init(),
            sass(),
            sourcemaps.write('.'),
            gulp.dest(options.dest)
        ).on('error', notify.onError());
    };
}