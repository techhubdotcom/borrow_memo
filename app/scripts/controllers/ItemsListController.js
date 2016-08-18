/**
 * Created by izabela on 17/08/16.
 */
angular.module('borrow_memo').controller('ItemsListCtrl', ['$scope', 'AuthService', 'DataBaseService', 'ngDialog', 'BorrowedItems', function ItemsListController($scope, AuthService, DataBaseService, ngDialog, BorrowedItems) {
    $scope.postData={};


    $scope.items=BorrowedItems.resultListNoReturned;



    $scope.logoutUser = function() {
        AuthService.logout().then(function(data){
                //success
                console.log("Logout succed");
            }, function(errMsg){
                console.log("Logout failed: ", errMsg);
            }
        );
    };



    $scope.saveItem = function(postData){
        if (postData.location==undefined || postData.name==undefined ||
            postData.company ==undefined  || postData.company==undefined || postData.item ==undefined){
            ngDialog.open({
                template: '<div class="ngdialog-theme-default saved-info">Incomplete data</div>',
                plain: 'true'
            });
        }else{

            $scope.postData.date = new Date();
            $scope.postData.returned = false;
            DataBaseService.saveItem(postData).then(function(data){
                    ngDialog.open({
                        template: '<div class="ngdialog-theme-default saved-info">Saved correctly</div>',
                        plain: 'true'
                    });
                }, function(errMsg){
                    ngDialog.open({
                        template: '<div class="ngdialog-theme-default saved-info">{{errMsg}}</div>',
                        plain: 'true'
                    });
                }
            );

        }
    }






}]);

