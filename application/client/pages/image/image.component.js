'use strict';

angular.module('pagesImage')
	.component('pagesImage', {
		templateUrl: 'pages/image/image.template.html',
		controller: function (utils) {
			this.utils = utils;
		}
	});
