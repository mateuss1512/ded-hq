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
        const username = document.getElementById("nome");
        const nick = document.getElementById("nickname");
        const classe = document.getElementById("classe");
        const idade = document.getElementById("idade");
        const raca = document.getElementById("raca");
        const exp  = document.getElementById("exp");
        const txtn = username.innerHTML;
        const txt = nick.innerHTML;
        const txt1 = classe.innerHTML;
        const txt2 = idade.innerHTML;
        const txt3 = raca.innerHTML;
        const txt4 = exp.innerHTML;
        const nntxt = txtn + userData.usuario;
        const ntxt = txt + userData.nick;
        const ntxt1 = txt1 + userData.classe;
        const ntxt2 = txt2 + userData.idade;
        const ntxt3 = txt3 + userData.raca;
        const ntxt4 = txt4 + userData.exp;

        username.innerHTML = nntxt;
        nick.innerHTML = ntxt;
        classe.innerHTML = ntxt1;
        idade.innerHTML = ntxt2;
        raca.innerHTML = ntxt3;
        exp.innerHTML = ntxt4;

      } else {
        console.log("Nome de usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao recuperar o nome do usuário:", error);
    });
}

