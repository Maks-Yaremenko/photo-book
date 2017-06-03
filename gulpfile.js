'use strict';

const gulp 	   = require('gulp'),
	  path     = require('path'),
	  cached   = require('gulp-cached'),
	  remember = require('gulp-remember'); 

function lazyTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}

lazyTask('styles', './gulp_tasks/styles', {
    src: 'application/client/sass/*.sass',
    dest: 'assets/css'
});

lazyTask('bundle', './gulp_tasks/bundle', {
    src: ['application/client/**/*.js',
    	  '!application/client/sass'],
    dst: 'assets/bundle',
    order: ['*.module.js', '*.js']
});

gulp.task('build', gulp.parallel('styles', 'bundle'));

gulp.task('watch', function() {
    gulp.watch('application/client/sass/*.sass', gulp.series('styles'));
    gulp.watch('application/client/**/*.js', gulp.series('bundle'))
        .on('unlink', function(filePath) {
            remember.forget('scripts', path.resolve(filePath));
            delete cached.caches.scripts[path.resolve(filePath)];
        });
});

lazyTask('serve', './gulp_tasks/serve', {
    port: 80,
    src: 'assets/**/*.*'
});

gulp.task('default',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);