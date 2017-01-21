(function () {
    'use strict';

    angular.module('BlurAdmin.pages.colors')
      .controller('colorsCtrl', colorsCtrl);

    /** @ngInject */
    function colorsCtrl($scope, $rootScope, $filter, $state, $stateParams, $window, $location, $timeout, toastr) {

        $scope.palettes = [];

        //heading colors
        $scope.slight = true;
        $scope.plight = true;

        //schemes in use
        $scope.hex = true;
        $scope.rgb = true;


        //form controls
        $scope.addPalette = function () {
            $scope.palettes.push({colors: []})
        }

        $scope.addColor = function (palette) {
            palette.colors.push({ color: '#000000', colorRgb: 'rgb(0,0,0)' });
        }

        $scope.copy = function (color) {
            //Todo: better solution
            var result = window.prompt("Copy to clipboard: Ctrl+C, Enter", color)
            if (result != null)
                toastr.success(color + " copied to clipboard");
        }


        //color functions
        $scope.calcRgb = function (color)
        {
            color.colorRgb = $scope.hex2rgb(color.color);
        }

        $scope.calcHex = function (color) {
            color.color = $scope.rgb2hex(color.colorRgb);
        }

        $scope.rgb2hex = function(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
             ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
             ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
             ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }

        $scope.hex2rgb = function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")" : "rgb";
        }

        $scope.shuffle = function (color) {
            color = $scope.randomColor();
        }

        $scope.randomColor = function () {

            var r = Math.floor((Math.random() * 255) + 1);
            var g = Math.floor((Math.random() * 255) + 1);
            var b = Math.floor((Math.random() * 255) + 1);

            var rgb = "rgb(" + r + "," + g + "," + b + ")";
            var color = { color: $scope.rgb2hex(rgb), colorRgb: rgb }

            return color;
        }


        //init
        $scope.palettes = [
            {
                colors: [
                    {
                        color: '#33AAAA',
                        colorRgb: 'rgb'
                    },
                    {
                        color: '#AA5555',
                        colorRgb: 'rgb'
                    }
                ]
            }
        ]

        //$scope.$watch('$scope.palettes[0].colors[0].color', function () {
        //$rootScope.primary = $scope.palettes[0].colors[0].color;
        //$rootScope.$broadcast("primaryChanged", true);

        //})
    }

})();