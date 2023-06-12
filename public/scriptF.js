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

function addTopic() {
  const topicInput = document.getElementById('topicInput');
  const topicText = topicInput.value;
  
  const topicTextInput = document.getElementById('topicTextInput');
  const topicTextInputValue = topicTextInput.value;

  db.collection("topics").add({
    topic: topicText,
    text: topicTextInputValue, 
    comments: []
  })
  .then(function(docRef) {
    console.log("Tópico adicionado com ID: ", docRef.id);
    topicInput.value = '';
    topicTextInput.value = ''; 
  })
  .catch(function(error) {
    console.error("Erro ao adicionar o tópico: ", error);
  });
}


function loadTopics() {
  const topicList = document.getElementById('topicList');
  topicList.innerHTML = '';

  db.collection("topics").get().then(function(querySnapshot) {
    if (querySnapshot.size === 0) {
      console.log("Nenhum documento encontrado na coleção 'topics'");
      return;
    }

    querySnapshot.forEach(function(doc) {
      const topicData = doc.data();
      const topicItem = document.createElement('li');
      topicItem.classList.add('topic-item');
      const showCommentsButton = document.createElement('button');
      const commentsSection = document.createElement('div');
      const addCommentForm = document.createElement('form');
      const commentInput = document.createElement('input');
      const commentButton = document.createElement('button');
      const deleteTopicButton = document.createElement('button');
      topicItem.innerText = topicData.topic;
      topicItem.setAttribute('data-id', doc.id);

      const topicTextElement = document.createElement('p');
      topicTextElement.innerText = topicData.text; // Mostra o texto do tópico

      const commentsList = document.createElement('ul');

      if (topicData.comments && topicData.comments.length > 0) {
        topicData.comments.forEach(function(comment, index) {
          const commentItem = document.createElement('li');
          commentItem.innerText = comment;
          const deleteCommentButton = document.createElement('button'); 
          deleteCommentButton.innerText = 'Excluir Comentário';
          deleteCommentButton.onclick = function() {
            deleteComment(doc.id, index); 
          };
          commentItem.appendChild(deleteCommentButton);
          commentsList.appendChild(commentItem);
        });
      } else {
        const noCommentsItem = document.createElement('li');
        noCommentsItem.innerText = 'Nenhum comentário ainda.';
        commentsList.appendChild(noCommentsItem);
      }
      commentInput.setAttribute('type', 'text');
      commentInput.setAttribute('placeholder', 'Digite um comentário');
      commentInput.id = `commentInput_${doc.id}`; 

      commentButton.innerText = 'Adicionar Comentário';
      commentButton.setAttribute('type', 'button');
      commentButton.onclick = function() {
        addComment(doc.id);
      };

      addCommentForm.appendChild(commentInput);
      addCommentForm.appendChild(commentButton);
      topicItem.appendChild(topicTextElement);
      topicItem.appendChild(addCommentForm);
      

      commentsSection.appendChild(commentsList);
      commentsSection.style.display = 'none'; 

      showCommentsButton.innerText = 'Mostrar Comentários';
      showCommentsButton.onclick = function() {
        toggleCommentsSection(commentsSection);
      };

      deleteTopicButton.innerText = 'Excluir Tópico';
      deleteTopicButton.onclick = function() {
        deleteTopic(doc.id); 
      };

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container'); 
      buttonContainer.appendChild(showCommentsButton);
      buttonContainer.appendChild(deleteTopicButton);

      topicItem.appendChild(buttonContainer);
      topicItem.appendChild(commentsSection);
      topicList.appendChild(topicItem);
    });
  }).catch(function(error) {
    console.error("Erro ao carregar os tópicos: ", error);
  });
}

function deleteTopic(topicId) {
  db.collection("topics").doc(topicId).delete()
    .then(function() {
      console.log("Tópico excluído com ID: ", topicId);
      loadTopics(); 
    })
    .catch(function(error) {
      console.error("Erro ao excluir o tópico: ", error);
    });
}

function deleteComment(topicId, commentIndex) {
  db.collection("topics").doc(topicId).get()
    .then(function(doc) {
      if (doc.exists) {
        var topicData = doc.data();
        var comments = topicData.comments || [];
        comments.splice(commentIndex, 1); 
        return db.collection("topics").doc(topicId).update({
          comments: comments
        });
      }
    })
    .then(function() {
      console.log("Comentário excluído no tópico com ID: ", topicId);
      loadTopics(); 
    })
    .catch(function(error) {
      console.error("Erro ao excluir o comentário: ", error);
    });
}


function toggleCommentsSection(commentsSection) {
  commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
}

function addComment(topicId) {
  const commentInput = document.getElementById(`commentInput_${topicId}`);
  const commentText = commentInput.value;

  db.collection("topics").doc(topicId).update({
    comments: firebase.firestore.FieldValue.arrayUnion(commentText)
  })
  .then(function() {
    console.log("Comentário adicionado ao tópico com ID: ", topicId);
    commentInput.value = '';
    loadTopics(); 
  })
  .catch(function(error) {
    console.error("Erro ao adicionar o comentário: ", error);
  });
}

window.onload = function() {
  loadTopics();
};