/**
 * Auto expand textarea field
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .directive('confirmOnExit', confirmOnExit);

    /** @ngInject */
    function confirmOnExit() {
        return {
            link: function ($scope, elem, attrs) {
                window.onbeforeunload = function () {
                    if ($scope.myForm.$dirty) {
                        return "The form is dirty, do you want to stay on the page?";
                    }
                }
                $scope.$on('$locationChangeStart', function (event, next, current) {
                    if ($scope.myForm.$dirty) {
                        if (!confirm("The form is dirty, do you want to stay on the page?")) {
                            event.preventDefault();
                        }
                    }
                });
            }
        };
    }

})();