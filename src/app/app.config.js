(function () {
    'use strict';

    angular
        .module('app')
        .config(configBlock);

    /** @ngInject */
    function configBlock($locationProvider, $logProvider) {
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true);
    }

})();
