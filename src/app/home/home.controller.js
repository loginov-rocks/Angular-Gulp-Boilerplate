(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($log, SAMPLE_CONSTANT) {
        var vm = this;

        vm.greeting = '';

        vm.showSampleConstant = showSampleConstant;

        activate();

        function activate() {
            vm.greeting = 'Hello, world!';
            $log.debug('HomeController activation');
        }

        function showSampleConstant() {
            alert(SAMPLE_CONSTANT);
        }
    }

})();
