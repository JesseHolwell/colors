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
            palette.colors.push({ color: '#000000' });
        }

        $scope.copy = function (color) {
            //Todo: better solution
            window.prompt("Copy to clipboard: Ctrl+C, Enter", color);
            toastr.success(color.color + " copied to clipboard");
        }

        //init
        $scope.palettes = [
            {
                colors: [
                    {
                        color: '#33AAAA'
                    },
                    {
                        color: '#AA5555'
                    }
                ]
            }
        ]

        $scope.$watch('$scope.palettes[0].colors[0].color', function () {
        $rootScope.primary = $scope.palettes[0].colors[0].color;
        $rootScope.$broadcast("primaryChanged", true);

        })
    }

})();