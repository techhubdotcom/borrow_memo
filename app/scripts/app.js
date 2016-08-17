/**
 * Created by izabela on 17/08/16.
 */
var bm = angular.module('borrow_memo', ['ngRoute']);



    bm.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
            }).
            when('/city:/^(london|warsaw|madrid|banglore)$/',{
                templateUrl: 'views/itemslist.html',
                controller: 'ItemsListCtrl',

            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
