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
        const nick = document.getElementById("nickname");
        nick.textContent = "Bem vindo: " + username + "!";
      } else {
        console.log("Nome de usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao recuperar o nome do usuário:", error);
    });
}

function register() {
  const nick = document.getElementById("nick").value;
  const idade = document.getElementById("idade").value;
  const classe = document.getElementById("classe").value;
  const raca = document.getElementById("raca").value;
  const exp = document.getElementById("xp").value;
  const msg = document.getElementById("msg");
  const myCollection = firestore.collection("users").doc(userId);

  myCollection.update({
    nick: nick,
    idade: idade,
    classe: classe,
    raca: raca,
    exp: exp,
  });

  msg.style.color = "green";
  msg.textContent = "Dados salvos com sucesso!";
}

function continuar() {
  const msg2 = document.getElementById("message");
  firestore.collection('users').doc(userId).get()
  .then((doc) => {
    if(doc.exists) {
      const userData = doc.data();
      if(userData.hasOwnProperty('classe')) {
      msg2.style.color = "green";
      msg2.textContent = "Registro confirmado!";
      window.location.href = "login.html";
      } else {
      msg2.style.color = "red";
      msg2.textContent = "Usuário não registrado! Preencha os campos!";
      }
    } else {
      console.log("Documento não existe");
    }
  })
  .catch((error) => {
    console.log('Erro ao obter os dados do usuário:', error);
  });

}
