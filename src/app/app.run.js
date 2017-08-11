(function() {
  'use strict';

  angular.module('app').run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, tmhDynamicLocale) {
    $rootScope.$on('$translateChangeSuccess', function(event, data) {
      tmhDynamicLocale.set(data.language);
      document.documentElement.setAttribute('lang', data.language);
    });

    $log.debug('App run block end');
  }

})();
