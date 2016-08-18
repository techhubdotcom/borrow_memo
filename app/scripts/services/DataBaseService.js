/**
 * Created by izabela on 18/08/16.
 */
angular.module('borrow_memo').service('DataBaseService', ['Properties', '$q', function(Properties, $q){

   var database = firebase.database();

    //Item:
    /*var postData = {
        date: 'date',
        location: 'string',
        name: 'string',
        company: 'string',
        item: 'string'
    };*/


    this.saveItem=function(postData){
        // Get a key for a new item.
        var newItemKey = firebase.database().ref().child(Properties.DATABASE_ENDPOINT).push().key;
        var updates = {};
        updates["/" + Properties.DATABASE_ENDPOINT + "/" + newItemKey] = postData;

        return firebase.database().ref().update(updates);
    };

    //Returns promise
    this.getItems = function(location){
        var itemsRef = firebase.database().ref(Properties.DATABASE_ENDPOINT).orderByChild('location').equalTo(location);
        //var itemsRef = firebase.database().ref(Properties.DATABASE_ENDPOINT).setWithPriority({ location: location, returned: false })
        var promise = itemsRef.once("value").then(function(data) {
            var result = {};
            result.resultListReturned = [];
            result.resultListNoReturned = [];
            data.forEach(function(item) {
                var value = item.val();
                value.key=item.key; //key used during the update
                if (value.returned === false){
                    result.resultListNoReturned.push(value);
                }else{
                    result.resultListReturned.push(value)
                }
            });
            return result;
        });
        return promise;
    }

    this.selectAsRemoved = function(item){
        //item.returned=true;
        var udpateItemRef = firebase.database().ref(Properties.DATABASE_ENDPOINT + "/" + item.key );
        //debugger;
        return udpateItemRef.update({
            "returned": true});

    }





}]);