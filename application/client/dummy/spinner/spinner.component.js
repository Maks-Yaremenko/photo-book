'use strict'; 

angular.module('dummy.spinner')
	.component('dummySpinner', {
		bindings: {
			image: '<'
		},
		templateUrl: 'dummy/spinner/spinner.template.html',
		controller: ['utils', function (utils) {
			this.utils = utils;
		}]
	})