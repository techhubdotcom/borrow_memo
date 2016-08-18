/**
 * Created by izabela on 17/08/16.
 */

angular.module('borrow_memo').controller('LoginCtrl', ['$scope', 'AuthService', function LoginController($scope, AuthService) {
    $scope.loginUserData = {};
    $scope.error;


    $scope.loginUser = function() {
        $scope.error=null;
        AuthService.authWithPassword($scope.loginUserData.email, $scope.loginUserData.password).then(function(data){
                console.log("Logged in as:", data.uid);
            }, function(errMsg){
                console.log("Authentication failed: ", errMsg);
                window.alert(errMsg.message);
            }
        );
    };




}]);




