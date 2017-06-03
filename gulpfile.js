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

function forgetFile (taskName, filePath) {
    remember.forget(taskName, path.resolve(filePath));
    delete cached.caches.scripts[path.resolve(filePath)];
}

const links = {
    modules: ['application/client/**/*.module.js', '!application/client/sass/*'],
    all: ['application/client/*.config.js', 'application/client/**/*.component.js', '!application/client/sass/*'],
    tpl: ['application/client/**/*.html']
}

lazyTask('build', './gulp_tasks/bundle', {
    all     : links.all,
    modules : links.modules,
    tpl     : links.tpl,
    dst     : 'assets/bundle',
    taskMod : 'modules',
    taskAll : 'otherJs',
    taskTpl : 'template',
    task    : 'build'
});

lazyTask('styles', './gulp_tasks/styles', {
    src: 'application/client/sass/*.sass',
    dest: 'assets/css'
});

gulp.task('styles', gulp.series('styles'));
gulp.task('bundle', gulp.series('build'));

gulp.task('watch', function() {
    gulp.watch('application/client/sass/*.sass', gulp.series('styles'));
    gulp.watch(links.modules, gulp.series('build'))
        .on('unlink', function(filePath) { forgetFile('modules', filePath); });
    gulp.watch(links.all, gulp.series('build'))
        .on('unlink', function(filePath) { forgetFile('otherJs', filePath); });
});

lazyTask('serve', './gulp_tasks/serve', {
    port: 80,
    src: 'assets/**/*.*'
});

gulp.task('default',
    gulp.series('styles', 'build', gulp.parallel('watch', 'serve'))
);