const firestore = firebase.firestore();
var userId;

function set() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userId = user.uid;
    }
  });
}

function register() {
  const usuario = document.getElementById("usuario").value;
  const nick = document.getElementById("nick").value;
  const idade = document.getElementById("idade").value;
  const classe = document.getElementById("classe").value;
  const raca = document.getElementById("raca").value;
  const exp = document.getElementById("xp").value;
  const msg = document.getElementById("msg");
  
  const myCollection = firestore.collection("users").doc(userId);

  myCollection.update({
    usuario: usuario,
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
      if(userData.hasOwnProperty('usuario')) {
      msg2.style.color = "green";
      msg2.textContent = "Registro confirmado!";
      window.location.href = "principal.html";
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

set();

