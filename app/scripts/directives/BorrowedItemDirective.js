/**
 * Created by izabela on 18/08/16.
 */
angular.module('borrow_memo').directive('borrowedElement',['ngDialog','DataBaseService', '$filter', function(ngDialog, DataBaseService, $filter){
    return{
        restrict : 'A',
        templateUrl: 'views/borrowedElement.html',
        scope : {
            item : '=',
            //updateController :'&'
        },
        link:function(scope){

            scope.convertedDate = $filter('date')(scope.item.date , "dd/MM/yyyy");


            scope.selectItemAsReturned = function(){
                ngDialog.openConfirm({
                    scope: scope,
                    template:
                    '<div class="ngdialog-message">' +
                    '  <span>Do you really want to select</br> this element as returned?</span>' +
                    '    <div class="ngdialog-buttons">' +
                    '      <button type="button" class="ngdialog-button" ng-click="confirm(item)">Yes</button>' +
                    '      <button type="button" class="ngdialog-button" ng-click="closeThisDialog()">Cancel</button>' +
                    '    </div>' +
                    '</div>',
                    plain: true
                }).then(function(item){
                    if (item!=undefined){
                        DataBaseService.selectAsReturned(item).then(function(data){
                                //scope.updateController({item:item});
                                ngDialog.open({
                                    template: '<div class="ngdialog-theme-default saved-info">Changed correctly</div>',
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

                })

            }



        }

    };
}]);