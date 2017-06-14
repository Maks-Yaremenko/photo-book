'use strict'; 

angular.module('photoBook').config(['$stateProvider', '$urlRouterProvider',

    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url: '/',
                component: 'pagesHome',
                resolve: {
                    fetchData: function ($transition$, utils) {
                        var state = $transition$.to().name;
                        utils.fetchData({state: state});
                    }
                }
            })
            .state('album',{
                url: '/album/:id',
                component: 'pagesAlbum',
                resolve: {
                    fetchData: function ($transition$, $stateParams, utils) {
                        var state = $transition$.to().name;
                        var id = $stateParams.id;
                        utils.fetchData({state: state, id: id});
                    }
                }
            })
            .state('photo',{
                url: '/photo/:id',
                template: '<span>Single photo</span>',
                controller: function ($state) {
                    console.log($state.params);
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