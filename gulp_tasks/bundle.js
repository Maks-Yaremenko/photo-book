'use strict';

const gulp     	 = require('gulp'),
	  order   	 = require('gulp-order'),
	  notify   	 = require('gulp-notify'),
	  cached   	 = require('gulp-cached'),
	  concat   	 = require('gulp-concat'),
	  remember 	 = require('gulp-remember'),
	  sourcemaps = require('gulp-sourcemaps'),
	  combine    = require('stream-combiner2').obj;

module.exports = function(options) {

    return function() {
        return combine(
	    	gulp.src(options.src, {since: gulp.lastRun('bundle')}),
	    	cached('scripts'),
	    	remember('scripts'),
	    	sourcemaps.init(),
	    	order(options.order),
	        concat('bundle.js'),
	        sourcemaps.write('.'),
	        gulp.dest(options.dst)
        ).on('error', notify.onError());
    };

};