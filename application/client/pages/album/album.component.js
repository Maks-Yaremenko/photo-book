'use strict';

angular.module('pagesAlbum')
	.component('pagesAlbum', {
		templateUrl: 'pages/album/album.template.html',
		controller: function ($state, utils) {
			this.utils = utils;
			this.state = $state;
		}
	});