/**
 * Created by izabela on 17/08/16.
 */


var bm = angular.module('borrow_memo', ['firebase', 'ngRoute', 'ngDialog']);



bm.config(['$routeProvider', function($routeProvider) {

    var commonData = function(city){
       var value =
        {
            templateUrl: 'views/mainActivityPage.html',
            controller: 'MainActivityCtrl',
            resolve: {
                BorrowedItems: ['DataBaseService', function (DataBaseService) {
                    return DataBaseService.getItemsOnce(city);
                }],
                SelectedCity: function () {
                    return city;
                }
            },
            access: {
                requiredLogin: true
            }
        };
        return value;
    };

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

bm.run(function($rootScope, $window, $location, AuthService, $route) {
    var isCheckedState = false; //used during the refresh;
                                //refreshed caused return to login

    firebase.auth().onAuthStateChanged(function(authData) {
        isCheckedState=true;
        if (authData){
            AuthService.setIsAuthenticated(true); //necessary for refresh of website
            var path = $location.path();
            $rootScope.$apply(function() {
                if (path=='/login'){
                    $location.path('/london');
                }else {
                    $location.path(path);
                }

            });

        }else{
            isCheckedState=true;
            console.log("User not logged");
            $rootScope.$apply(function() {
                $location.path("/login");
                console.log($location.path());
            });
            AuthService.setIsAuthenticated(false);



        }
    });

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        var auth = AuthService.isAuthenticatedUser();
        if ((next.access && next.access.requiredLogin) && !auth && isCheckedState) {
            $location.path("/login");
        }
        //no redirect authentificated user to login:
        else if (auth && ((next.redirectTo!=undefined && next.redirectTo.localeCompare('/login')==0)
         || (next.$$route!=undefined && next.$$route.originalPath!=undefined && next.$$route.originalPath.localeCompare('/login')==0)) ){
            if (current.$$route!=undefined){
                $location.path(current.$$route.originalPath);
            }else{
                $location.path('/london');
            }
        }


    });





});



