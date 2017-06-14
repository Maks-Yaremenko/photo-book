'use strict'

angular.module('coreUtils')
    .factory('utils', ['$http', 'Cache', function($http, Cache) {
        return {

            data: [],

            page: 0,

        	segment : 9,

        	urls: {
        		home : 'https://jsonplaceholder.typicode.com/photos',
        		album: 'http://jsonplaceholder.typicode.com/albums/{id}/photos',
        		photo: 'http://jsonplaceholder.typicode.com/photos/{id}'
        	},

            resetData: function () {
                this.page = 0;
                this.data = [];
            },

        	generateUrl: function (params) {
        		return params.state === 'home' ? this.urls[params.state] : this.urls[params.state].replace('{id}', params.id);
        	},

			fetchData: function(params) {

				var self = this,
					url = this.generateUrl(params),
           			cachedData = Cache.get(url);

           		if (cachedData) { 
                    angular.extend([], this.data, cachedData.slice(0, this.segment)); 
                }

                this.resetData();

                $http.get(url)
                    .then(function(data) {
                    	Cache.put(url, data.data);
                        self.data = data.data.slice(0, self.segment)
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
            }
        }
    }]);
