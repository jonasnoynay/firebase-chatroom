
var ChatRoom = {};


(function(){

    var _user = null;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          _user = user;
          document.getElementById('userFullname').innerText = user.displayName;
        } else {
            //
            window.location.replace('login.html');
        }
      });

      var db = firebase.firestore();
      var inputMessage = document.getElementById('inputMessage');
      var chatContainer = document.getElementById('chatContainer');

      ChatRoom.LogOut = function() {
          firebase.auth().signOut();
      }

      ChatRoom.addMessage = function() {

        if(inputMessage.value == '') return alert('Please input a message');
        var message = inputMessage.value;

        db.collection("messages").add({
            userid: _user.uid,
            name: _user.displayName,
            message: message,
            datecreated: Date.now()
        })
        .then(function(docRef) {
            inputMessage.value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }

      db.collection("messages").orderBy('datecreated', 'asc').onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                ChatRoom.appendMessage(change.doc.data());
            }
        });
    });

      ChatRoom.appendMessage = function (user) {
        var toAppend = document.createElement('div');
        if(_user.uid == user.userid) {
            toAppend.className = 'chat chat-right';
        } else {
            toAppend.className = 'chat chat-left';
        }
        toAppend.innerHTML = '<img src="profile.jpg" />'+
        '<div class="chat-con">'+
            '<p class="chat-name">'+user.name+'</p>'+
            '<div class="chat-message">'+user.message+'</div>'+
        '</div>';
        chatContainer.appendChild(toAppend);
      }
      
})();