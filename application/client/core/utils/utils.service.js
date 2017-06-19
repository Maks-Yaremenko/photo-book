'use strict'

angular.module('coreUtils')
    .factory('utils', ['$http', 'Cache', '$state', '$window', function($http, Cache, $state, $window) {
        return {

            data: [],

            image: {},

            page: 0,

        	segment : 9,

            loading: true,

        	urls: {
        		home : 'https://jsonplaceholder.typicode.com/photos',
        		album: 'http://jsonplaceholder.typicode.com/albums/{id}/photos',
        		image: 'http://jsonplaceholder.typicode.com/photos/{id}'
        	},

        	generateUrl: function (params) {
        		return params.state === 'home' ? this.urls[params.state] : this.urls[params.state].replace('{id}', params.id);
        	},

			fetchData: function(params) {

				var self = this,
					url = this.generateUrl(params),
           			cachedData = Cache.get(url);
                    this.page = 0;
                    this.data = [];
                    this.loading = true;

           		if (cachedData) {
                    self.loading = false;
                    return this.data = cachedData.slice(0, this.segment);
                }

                $http.get(url)
                    .then(function(data) {
                        Cache.put(url, data.data);
                        self.data = data.data.slice(0, self.segment);
                        self.loading = false;
                    });
            },

            fetchImageData: function (params) {
                var self = this,
                    url = this.generateUrl(params),
                    cachedData = Cache.get(url);
                this.image = {};
                this.loading = true;

                if (cachedData) {
                    self.loading = false;
                    return this.image = cachedData;
                }

                $http.get(url)
                    .then(function(data) {
                        Cache.put(url, data.data);
                        self.image = data.data;
                        self.loading = false;
                    });
            },

            pagination : function (params) {

                this.page +=1;

                var id = params.params.id,
                    state = params.current.name,
                    start = this.page * this.segment,
                    end = (this.page + 1) * this.segment,
                    cachedData = Cache.get(this.generateUrl({state: state, id: id}));
                
                if (!cachedData) { return false; }
                this.data = this.data.concat(cachedData.slice(start, end));
            },

            toState: function (state, params) {
                $state.go(state, params);
            },

            openInNewTab: function (link) {
                $window.open(link, '_blank');
            }
        }
    }]);
