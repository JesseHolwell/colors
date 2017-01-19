(function () {
    'use strict';

    angular.module('BlurAdmin.pages.colors')
      .controller('colorsCtrl', colorsCtrl);

    /** @ngInject */
    function colorsCtrl($scope, $rootScope, $uibModal, $filter, $state, leafletData, $stateParams, $window, $location, $timeout, toastr) {

        $scope.palettes = [];

        $scope.addPalette = function () {
            $scope.palettes.push({colors: []})
        }

        $scope.addColor = function (palette) {
            palette.colors.push({});
        }
    }

})();