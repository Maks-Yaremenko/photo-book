'use strict'; 

angular.module('dummy.header')
	.component('dummyHeader', {
		templateUrl: 'dummy/header/header.template.html',
		controller: ['utils', function (utils) {
			this.utils = utils;
		}]
	})