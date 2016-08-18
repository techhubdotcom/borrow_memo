/**
 * Created by izabela on 17/08/16.
 */
angular.module('borrow_memo').service('AuthService', function(){
    var isAuthentificated = false;
    var authentificatedUser = {};


    var config = {
        apiKey: "AIzaSyCOu7W5SkqB4wuuFBzzJCWQtK-rNM10H0M",
        authDomain: "borrowmemo-140620.firebaseapp.com",
        databaseURL: "https://borrowmemo-140620.firebaseio.com",
        storageBucket: "borrowmemo-140620.appspot.com",
    };

    firebase.initializeApp(config);
    var rootRef = firebase.database().ref();


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




});