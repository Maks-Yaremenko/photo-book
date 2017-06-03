'use strict'; 

angular.module('photoBook').config(['$stateProvider', '$urlRouterProvider',

    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url: '/',
                template: '<pages.home></pages.home>'
                })
            .state('folder',{
                url: '/folder/:id',
                template: '<span>Folder review</span>'
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