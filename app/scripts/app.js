/**
 * Created by izabela on 17/08/16.
 */


var bm = angular.module('borrow_memo', ['firebase', 'ngRoute', 'ngDialog']);



bm.config(['$routeProvider', function($routeProvider) {

    var commonData = function(city){
       var value =
        {
            templateUrl: 'views/itemslist.html',
            controller: 'ItemsListCtrl',
            resolve:{
            BorrowedItems:['DataBaseService', function(DataBaseService){
                return DataBaseService.getItems(city);
            }]
            },
            authRequired: true
        }
        return value;
    }

    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).
        when('/london',commonData('london')).
        when('/warsaw',commonData('warsaw')).
        when('/madrid',commonData('madrid')).
        when('/banglore',commonData('banglore')).
        otherwise({
            redirectTo: '/login'
        });
}]);

bm.run(function($rootScope, $window, $location, AuthService) {

    firebase.auth().onAuthStateChanged(function(authData) {
        if (authData) {
            console.log("User: " + authData.email);
            AuthService.setIsAuthenticated(true);
            $rootScope.$apply(function() {
                $location.path("/london");
                console.log($location.path());
            });

        } else{
            console.log("User not logged");
            AuthService.setIsAuthenticated(false);
            $rootScope.$apply(function() {
                $location.path("/login");
                console.log($location.path());
            });

        }
    });



});


