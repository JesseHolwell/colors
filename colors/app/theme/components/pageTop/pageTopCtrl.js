(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $rootScope, $q, $timeout, $state) {
        $rootScope.$watch('subscriber', function () {
            if ($rootScope.subscriber == null)
            {
                $scope.tempsubscriber = { Logo: 'http://www.leicesteroffice.co.uk/subsite/leic/wp-content/uploads/2014/05/facebook-default-no-profile-pic-800x800.jpg' };
            }
            else
            {
                $scope.tempsubscriber = null;
                $scope.subscriber = $rootScope.subscriber;
            }
        }); 

        $scope.Logout = function () {

            $rootScope.subscriberId = null;
            $rootScope.subscriber = null;

            $scope.subscriberId = $rootScope.subscriberId;
            $scope.subscriber = $rootScope.subscriber;

            $state.go('login');
        }



    }
})();