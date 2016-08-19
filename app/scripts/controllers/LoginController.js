/**
 * Created by izabela on 17/08/16.
 */

angular.module('borrow_memo').controller('LoginCtrl', ['$scope', 'AuthService','ngDialog',  '$location', '$rootScope',
    function LoginController($scope, AuthService, ngDialog, $location, $rootScope) {

        $scope.loginUserData = {};
        $scope.error;


        $scope.loginUser = function() {
            $scope.error=null;
            AuthService.authWithPassword($scope.loginUserData.email, $scope.loginUserData.password).then(function(data){
                    console.log("Logged in as:", data.uid);
                    //redirect
                    AuthService.setIsAuthenticated(true);
                    $rootScope.$apply(function() {
                        $location.path("/london");
                    });
                }, function(errMsg){
                    console.log("Authentication failed: ", errMsg);
                    window.alert(errMsg.message);
                }
            );
        };




}]);




