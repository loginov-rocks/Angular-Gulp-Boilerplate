(function () {
    'use strict';

    angular
        .module('app')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
