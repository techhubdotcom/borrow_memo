/**
 * Created by izabela on 18/08/16.
 */
angular.module('borrow_memo').controller('MainCtrl', ['$scope','AuthService','$location', function MainController($scope, AuthService, $location) {
    $scope.security = AuthService;
    $scope.$location = $location
}]);