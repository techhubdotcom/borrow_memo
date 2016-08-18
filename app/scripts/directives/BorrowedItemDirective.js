/**
 * Created by izabela on 18/08/16.
 */
angular.module('borrow_memo').directive('borrowedElement',['ngDialog','DataBaseService', function(ngDialog, DataBaseService){
    return{
        restrict : 'A',
        templateUrl: 'views/borrowedElement.html',
        scope : {
            item : '='
        },
        link:function(scope, el){


            scope.selectItemAsReturned = function(){
                ngDialog.openConfirm({
                    scope: scope,
                    template:
                    '<div class="ngdialog-message">' +
                    '  <span>Do you really want to select this element as returned?</span>' +
                    '    <div class="ngdialog-buttons">' +
                    '      <button type="button" class="ngdialog-button" ng-click="confirm(item)">Yes</button>' +
                    '      <button type="button" class="ngdialog-button" ng-click="closeThisDialog()">Cancel</button>' +
                    '    </div>' +
                    '</div>',
                    plain: true
                }).then(function(item){
                    if (item!=undefined){
                        DataBaseService.selectAsRemoved(item).then(function(data){
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