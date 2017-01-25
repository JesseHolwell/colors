(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('MsgCenterCtrl', MsgCenterCtrl);

    function MsgCenterCtrl($scope, $rootScope, $state, toastr, $interval, $timeout ) {

        var vm = this;

        vm.subscriberId = $rootScope.subscriberId;
        vm.loggedIn = false;
        vm.notifications = [];

        vm.goToAppointment = function (appointment) {
            var myAppointment = JHDGUtils._.findWhere(vm.appointments, {
                Id: appointment.Id
            });
            myAppointment.Status = 0;
          
        }

        vm.init = function () {
            vm.subscriberId = $rootScope.subscriberId;

            if (vm.subscriberId != null) {
                vm.loggedIn = true;
                AppointmentAPIService.GetAppointments(vm.subscriberId, true).then(function (data) {

                    vm.appointments = data;
                    $scope.unreadCount = 0;

                    for (var i = 0; i < vm.appointments.length; i++) {
                        if (moment(vm.appointments[i].StartTime) < moment(new Date())) {
                            vm.notifications.push({
                                Id: vm.appointments[i].Id,
                                subject: vm.appointments[i].Subject,
                                time: vm.appointments[i].StartTime,
                                read: (vm.appointments[i].Status == "Active") ? true : false,
                            });
                            if (vm.appointments[i].Status != "Active")
                                $scope.unreadCount++;
                        }
                    }

                    $timeout(function(){
                        $scope.loggedInUser = $rootScope.subscriber.Contact.Given + " " + $rootScope.subscriber.Contact.Surname;
                        $scope.$evalAsync();
                    }, 3000);

                }, function (error) {
                    toastr.error('Failed to load template', 'Error');
                });
            }
        }


        $scope.$on("staffChanged", function () {
            vm.init();
        });

    }
})();