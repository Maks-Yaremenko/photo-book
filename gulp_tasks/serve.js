'use strict';

const browserSync     = require('browser-sync').create(),
      historyFallback = require('connect-history-api-fallback');

module.exports = function(options) {

    return function() {
        browserSync.init({
        	port: options.port,
            server: {
                baseDir: '.',
                middleware: [historyFallback({
				    index: '/assets/index.html'
				})]
            }
        });

        browserSync.watch(options.src).on('change', browserSync.reload);
    };
};
