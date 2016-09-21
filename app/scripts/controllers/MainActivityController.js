/**
 * Created by izabela on 17/08/16.
 */
angular.module('borrow_memo').controller('MainActivityCtrl', ['$scope', 'AuthService', 'DataBaseService', 'ngDialog', 'BorrowedItems', '$rootScope', '$location', 'SelectedCity', 'Properties', '$timeout',
    function MainActivityController($scope, AuthService, DataBaseService, ngDialog, BorrowedItems, $rootScope, $location, SelectedCity, Properties, $timeout) {
        $scope.postData={};
        var selectedCity = SelectedCity;


       /*DataBaseService.getItems(selectedCity).then(
            function(data) {
                console.log("Result returned by a promise");
            },
            function(err) {
                // handle error
            }
        );*/


        var itemsRef = firebase.database().ref(Properties.DATABASE_ENDPOINT).orderByChild('location').equalTo(selectedCity);
            itemsRef.on("value", function(data) {
                var result = {
                    resultListReturned: [],
                    resultListNoReturned: []
                };
                data.forEach(function(item) {
                    var value = item.val();
                    value.key=item.key; //key used during the update
                    if (value.returned === false){
                        result.resultListNoReturned.push(value);
                    } else{
                        result.resultListReturned.push(value)
                    }
                });
                //BorrowedItems = result;
                //$scope.items=BorrowedItems.resultListNoReturned;
                //$scope.$apply();
                $timeout(function() {
                    BorrowedItems = result;
                    if  ($scope.showedBorrowed==true) {
                        $scope.items=BorrowedItems.resultListNoReturned;
                    }
                }, 0);
            });



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
                    AuthService.setIsAuthenticated(false);
                    $rootScope.$apply(function() {
                        $location.path("/login");
                    });
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
                item.returned=true;
                BorrowedItems.resultListReturned.push(item);
            }
        };



        $scope.saveItem = function(postData){
            if (postData.location==undefined || postData.name==undefined ||
                postData.company == undefined  || postData.company==undefined || postData.item ==undefined){
                ngDialog.open({
                    template: '<div class="ngdialog-theme-default saved-info">Incomplete data</div>',
                    plain: 'true'
                });
            }else{
                $scope.postData.date = new Date();
                $scope.postData.returned = false;
                DataBaseService.saveItem($scope.postData).then(function(data){
                        ngDialog.open({
                            template: '<div class="ngdialog-theme-default saved-info">Saved correctly</div>',
                            plain: 'true'
                        });
                        $scope.postData={};

                    }, function(errMsg){
                        ngDialog.open({
                            template: '<div class="ngdialog-theme-default saved-info">Sorry, there was some error</div>',
                            plain: 'true'
                        });
                        $scope.postData={};
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


