
var MainApp = {};


(function(){

    App = firebase;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          document.getElementById('name').innerText = user.displayName;
        } else {
            //
            window.location.replace('login.html');
        }
      });

      MainApp.LogOut = function() {
          firebase.auth().signOut();
      }
})();