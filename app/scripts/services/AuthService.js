/**
 * Created by izabela on 17/08/16.
 */
angular.module('borrow_memo').service('AuthService',[ 'Properties', function(Properties){
    var isAuthentificated = false;


    firebase.initializeApp(Properties.FIREBASE_CONFIG);
    //var rootRef = firebase.database().ref();


    this.getAuth = function(){
        debugger;
        var authData =  firebase.auth().ref().getAuth();
        if (authData) {
            isAuthentificated = true;
            return true;
        } else {
            isAuthentificated = false;
            return false;
        }

    }


    //Email/Password login
    // returns a promise
    this.authWithPassword = function(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    this.logout = function() {
        return firebase.auth().signOut();
    } ;


    this.isAuthenticatedUser = function(){
        return isAuthentificated;
    };

    this.setIsAuthenticated = function(isAuth){
        isAuthentificated = isAuth;
    };




}]);