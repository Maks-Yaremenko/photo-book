'use strict'; 

angular.module('photoBook').config(['$stateProvider', '$urlRouterProvider',

    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url: '/',
                component: 'pagesHome',
                resolve: {
                    fetchData: function (utils) {
                        utils.fetchData({state: 'home'});
                    }
                }
            })
            .state('album',{
                url: '/album/:id',
                component: 'pagesAlbum',
                resolve: {
                    fetchData: function ($stateParams, utils) {
                        var id = $stateParams.id;
                        utils.fetchData({state: 'album', id: id});
                    }
                }
            })
            .state('image',{
                url: '/image/:id',
                component: 'pagesImage',
                resolve: {
                    fetchData: function ($stateParams, utils) {
                        var id = $stateParams.id;
                        utils.fetchImageData({state: 'image', id: id});
                    }
                }
            });

}]).config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);