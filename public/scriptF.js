var db = firebase.firestore();

var chatDocRef = db.collection("chats").doc("msg");
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");
var chatMessages = document.getElementById("chat-messages");

var userId;

function set() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userId = user.uid;
      const usersDocRef = db.collection("users").doc(userId);
      fuckoff(usersDocRef);
      print(usersDocRef);
    } else {
      console.log("Nenhum usuário logado.");
    }
  });
}

set();

function fuckoff(usersDocRef) {
  usersDocRef.get().then(function (userDoc) {
    if (userDoc.exists) {
      var userData = userDoc.data();
      var userName = userData.nick;
      console.log("Nome do usuário: " + userName);

      sendButton.setAttribute("data-username", userName);
    }
  });
}
sendButton.addEventListener("click", function () {
  var userName = sendButton.getAttribute("data-username");

  var messageText = messageInput.value;

  if (messageText.trim() !== "") {
    chatDocRef.get().then(function (doc) {
      if (doc.exists) {
        var existingMessages = doc.data().messages || [];
        var updatedMessages = [
          ...existingMessages,
          {
            user: userName,
            text: messageText,
            timestamp: new Date(),
          },
        ];
        chatDocRef
          .update({ messages: updatedMessages })
          .then(function () {
            console.log("Mensagem salva com sucesso!");
          })
          .catch(function (error) {
            console.error("Erro ao salvar mensagem: ", error);
          });
      }
    });
    messageInput.value = "";
  }
});

chatDocRef.onSnapshot(function (doc) {
  if (doc.exists) {
    var chatData = doc.data();
    var messages = chatData.messages || [];
    if (messages && messages.length > 0) {
      messages.forEach(function (message) {
        var messageElement = document.createElement("p");
        messageElement.textContent = message.user + ": " + message.text;
        chatMessages.appendChild(messageElement);
      });
    }
    chatMessages.innerHTML = "";

    messages.forEach(function (message) {
      var messageElement = document.createElement("p");
      messageElement.textContent = message.user + ": " + message.text;
      chatMessages.appendChild(messageElement);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

function print(usersDocRef) {
  usersDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const username = userData.usuario;
        const nick = document.getElementById("usuario");
        nick.textContent = "Bem vindo, " + username + "!";
        return usersDocRef;
      } else {
        console.log("Nome de usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao recuperar o nome do usuário:", error);
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch(() => {
    alert("Erro ao fazer logout!");
  })
}
