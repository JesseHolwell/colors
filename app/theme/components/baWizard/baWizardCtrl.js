(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
      .controller('baWizardCtrl', baWizardCtrl);

    /** @ngInject */
    function baWizardCtrl($scope, $rootScope) {
        var vm = this;
        vm.tabs = [];

        vm.tabNum = 0;
        vm.progress = 0;

        vm.addTab = function (tab) {
            tab.setPrev(vm.tabs[vm.tabs.length - 1]);
            vm.tabs.push(tab);
            vm.selectTab(0);
        };

        $scope.$watch(angular.bind(vm, function () { return vm.tabNum; }), calcProgress);

        //listens to $scope.resetWizard commonly initilized on controller load and edit to reset the form back to the first tab
        $scope.$watch('resetWizard', function () {
            vm.selectTab(0);
        });

        vm.selectTab = function (tabNum) {
            vm.tabs[vm.tabNum].submit();

            if (vm.tabs[vm.tabNum].title == "Quote Info" || vm.tabs[vm.tabNum].title == "Job Info" || vm.tabs[vm.tabNum].title.includes("Address")) {
                $rootScope.$broadcast("validateAddressTab");
            }

            if (vm.tabs[tabNum].isAvailiable()) {
                vm.tabNum = tabNum;

                vm.tabs.forEach(function (t, tIndex) {
                    tIndex == vm.tabNum ? t.select(true) : t.select(false);
                });
            }
        };

        vm.isFirstTab = function () {
            return vm.tabNum == 0;
        };

        vm.isLastTab = function () {
            return vm.tabNum == vm.tabs.length - 1;
        };

        vm.nextTab = function () {
            var nextTab = vm.tabNum + 1;
            if (vm.tabs[vm.tabNum].title == "Quote Info" || vm.tabs[vm.tabNum].title == "Job Info" || vm.tabs[vm.tabNum].title.includes("Address")) {

                $rootScope.$broadcast("validateAddressTab");
            }

            if (vm.tabs[vm.tabNum].title == "Prospect Contact Info") {
                if ($scope.prospect.Surname != null || $scope.prospect.Given != null || $scope.prospect.DefaultEmail != null || $scope.prospect.DefaultPhone != null) {
                    $scope.prospect.HasError = false;
                }
                else {
                    $scope.prospect.HasError = true;
                    nextTab -= 1;
                }
            }

            if (vm.tabs[vm.tabNum].title == "Customer Contact Info") {
                if ($scope.customer.Contact.Surname != null || $scope.customer.Contact.Given != null || $scope.customer.Contact.DefaultEmail != null || $scope.customer.Contact.DefaultPhone != null) {
                    $scope.customer.HasError = false;
                }
                else {
                    $scope.customer.HasError = true;
                    nextTab -= 1;
                }
            }



            vm.selectTab(nextTab)
        };

        vm.previousTab = function () {
            vm.selectTab(vm.tabNum - 1)
        };

        function calcProgress() {
            vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
        }
    }
})();

