'use strict';

angular.module('pagesHome')
	.component('pagesHome', {
		templateUrl: 'pages/home/home.template.html',
		controller: function ($state, utils) {
			this.utils = utils;
			this.state = $state;
		}
	});
