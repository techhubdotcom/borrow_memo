/**
 * Created by izabela on 17/08/16.
 */
angular.module('borrow_memo').controller('ItemsListCtrl', ['$scope', 'AuthService', 'DataBaseService', 'ngDialog', 'BorrowedItems', function ItemsListController($scope, AuthService, DataBaseService, ngDialog, BorrowedItems) {
    $scope.postData={};


    $scope.items=BorrowedItems.resultListNoReturned;
    $scope.showedBorrowed = true;

    $scope.showReturned = function(){
        $scope.showedBorrowed=false;
        $scope.items=BorrowedItems.resultListReturned;
    };

    $scope.showBorrowed = function(){
        $scope.showedBorrowed=true;
        $scope.items=BorrowedItems.resultListNoReturned;
    };



    $scope.logoutUser = function() {
        AuthService.logout().then(function(data){
                //success
                console.log("Logout succeed");
            }, function(errMsg){
                console.log("Logout failed: ", errMsg);
            }
        );
    };


    $scope.updateController = function(item){
        if (item!==undefined &&  $scope.showedBorrowed==true){
            var ind = $scope.items.indexOf(item);
            //$scope.items.splice(ind, 1);
            BorrowedItems.resultListNoReturned.splice(ind, 1);
            BorrowedItems.resultListReturned.push(item);
        }
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
            DataBaseService.saveItem(post).then(function(data){
                    if ($scope.showedBorrowed==true) { //only for borrowed;
                        $scope.postData.key=data.key;
                        //$scope.items.push($scope.postData);
                        BorrowedItems.resultListNoReturned.push($scope.postData);
                    }
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

angular.module('borrow_memo').filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

