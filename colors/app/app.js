'use strict';

// app.js

// angular app

(function (BlurAdmin) {
    BlurAdmin.run(function ($rootScope, $crypto, $state, $stateParams, $cookies, $timeout, $http, $location, $window) {

        $rootScope.version = "1.1.11";
        $rootScope.$on('$stateChangeStart',
         function (event, toState, toParams, fromState, fromParams) {
             $rootScope.prevState = fromState;
             $rootScope.$broadcast("pageChanged", fromState);
         });

        $rootScope.GetErrorMessage = function (error) {
            var errorString = "";
            if (error.error != null) {
                errorString += error.error.message;
                if (error.error.innererror != null)
                    errorString += " Inner Error: " + error.error.innererror.message;
            }
            return errorString;
        }

    }).$inject = ['$rootScope'];

    BlurAdmin.filter('ifEmpty', function() {
    return function(input, defaultValue) {
        if (angular.isUndefined(input) || input === null || input === '' || !input.replace(/\s/g, '').length) {
            return defaultValue;
        }

        return input;
    }
    });

    BlurAdmin.filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop];

                        if (item != null && item[prop] != null) {
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });


    ///Returns entities that match at least one of the passed in values
    BlurAdmin.filter('nestedPropsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var temp = props[prop];
                        if (props[prop]) {

                            if (typeof temp === 'string')
                                var text = props[prop].toLowerCase();
                            else
                                var text = props[prop];

                            if (prop.indexOf('.') > -1) {
                                var foundItem = get(item, prop);
                                if (foundItem != null)
                                    item[prop] = foundItem;
                            }

                            if (item != null && item[prop] != null) {
                                if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                    itemMatches = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

    ///Returns entities that match all of the passed in values
    BlurAdmin.filter("angularNestedFilter", function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = true;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var temp = props[prop];
                        if (props[prop]) {

                            if (typeof temp === "string")
                                var text = props[prop].toLowerCase();
                            else
                                var text = props[prop];

                            if (prop.indexOf('.') > -1) {
                                var foundItem = get(item, prop);
                                if (foundItem != null)
                                    item[prop] = foundItem;
                            }

                            if (item != null && item[prop] != null) {
                                if (item[prop].toString().toLowerCase().indexOf(text) == -1) {
                                    itemMatches = false;
                                }
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }

            return out;
        };
    });

    function get(object, path) {
        if (typeof path === "string") {
            path = path.split(".");
        }

        if (!(path instanceof Array) || path.length === 0) {
            return;
        }

        path = path.slice();

        var key = path.shift();

        if (typeof object !== "object" || object === null) {
            return;
        }

        if (path.length === 0) {
            return object[key];
        }

        if (path.length) {
            return get(object[key], path);
        }
    };


})(
angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'ngCookies',
  'toastr',
  'smart-table',
  'ui.slimscroll',
  'angular-progress-button-styles',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'angucomplete-alt',
  'leaflet-directive',
  'mdo-angular-cryptography',
  'ngSanitize',
  'ui.select',


]).factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope) {
    // Active request count
    var requestCount = 0;

    function startRequest(config) {
        // If no request ongoing, then broadcast start event
        if (!requestCount) {
            $rootScope.$broadcast('httpLoaderStart');
        }

        requestCount++;
        return config;
    }

    function endRequest(arg) {
        // No request ongoing, so make sure we don’t go to negative count
        if (!requestCount)
            return;

        requestCount--;
        // If it was last ongoing request, broadcast event
        if (!requestCount) {
            $rootScope.$broadcast('httpLoaderEnd');
        }

        return arg;
    }

    // Return interceptor configuration object
    return {
        'request': startRequest,
        'requestError': endRequest,
        'response': endRequest,
        'responseError': endRequest
    };
}]),

angular.module('BlurAdmin').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpLoaderInterceptor');
}]),
angular.module('BlurAdmin').config(['$cryptoProvider', function ($cryptoProvider) {
    $cryptoProvider.setCryptographyKey('ABCD123');
}]),

angular.module('BlurAdmin').config(function ($logProvider) {
    $logProvider.debugEnabled(false);
}),

angular.module('BlurAdmin').directive('httpLoader', function () {
    return {
        restrict: 'EA',
        link: function (scope, element) {
            // Store original display mode of element
            var shownType = element.css('display');
            function hideElement() {
                element.css('display', 'none');
            }

            scope.$on('httpLoaderStart', function () {
                element.css('display', shownType);
            });

            scope.$on('httpLoaderEnd', hideElement);

            // Initially hidden
            hideElement();
        }
    };
})
);