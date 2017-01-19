(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
      'ui.router',
       'dndLists',
      'BlurAdmin.pages.colors',

    ])
    .config(routeConfig);

    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {

    }

})();
