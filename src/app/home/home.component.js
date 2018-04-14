(function() {
  'use strict';

  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'app/home/home.view.html',
  });

  /** @ngInject */
  function HomeController($log, $rootScope, $translate, SAMPLE_CONSTANT) {
    const vm = this;

    // Scope variables go here:
    // vm.variable = 'value';

    vm.showSampleConstant = showSampleConstant;
    vm.switchLanguage = switchLanguage;

    activate();

    function activate() {
      $log.debug('home activated');
    }

    function showSampleConstant() {
      alert(SAMPLE_CONSTANT);
    }

    function switchLanguage(language) {
      $translate.use(language);
    }

  }

})();
