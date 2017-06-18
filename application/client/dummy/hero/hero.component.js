'use strict'; 

angular.module('dummy.hero')
	.component('dummyHero', {
		bindings: {
			image: '<'
		},
		templateUrl: 'dummy/hero/hero.template.html',
		controller: ['utils', function (utils) {
			this.utils = utils;
		}]
	})