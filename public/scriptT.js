const firestore = firebase.firestore();
var userId;

function set() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userId = user.uid;
      const usersDocRef = firestore.collection("users").doc(userId);
      print(usersDocRef);
    } else {
      console.log("Nenhum usuário logado.");
    }
  });
}

set();

function print(usersDocRef) {
  usersDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const username = userData.usuario;
        const nick = document.getElementById("usuario");
        nick.textContent = "Olá, " + username + "!";
        return usersDocRef;
      } else {
        console.log("Nome de usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao recuperar o nome do usuário:", error);
    });
}