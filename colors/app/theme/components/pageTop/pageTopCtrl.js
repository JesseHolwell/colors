(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $rootScope, $q, $timeout, $state) {


        //listen for the color broadcast
        $scope.$on("primaryChanged", function () {
            $scope.primary = $rootScope.primary;
        
        });

        //apply color

    }
})();