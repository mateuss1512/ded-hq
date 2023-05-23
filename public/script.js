const firebaseConfig = {
        apiKey: "AIzaSyACCL9rEfx476t-FMAcNvyrI6UUv3VpiSY",
        authDomain: "ded-hq-7288b.firebaseapp.com",
        databaseURL: "https://ded-hq-7288b-default-rtdb.firebaseio.com",
        projectId: "ded-hq-7288b",
        storageBucket: "ded-hq-7288b.appspot.com",
        messagingSenderId: "949359359975",
        appId: "1:949359359975:web:d8ecf544075c739a42ef42",
        measurementId: "G-9F8MKPXPV7",
      };

      firebase.initializeApp(firebaseConfig);

      var db = firebase.firestore();
      var auth = firebase.auth();

function registrarUsuario() {
  var email = document.getElementById('email').value;
  var senha = document.getElementById('password').value;
  var usuario = document.getElementById('username').value;
  var msg = document.getElementById('message');
  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;
      db.collection('users').doc(user.uid).set({
        email: user.email,
        usuario: usuario
      })
      .then(() => {
        msg.style.color = "green";
        msg.textContent = ("Usuário registrado com sucesso!");
        document.getElementById('password').value = '';
        document.getElementById('email').value = '';
        document.getElementById('username').value = '';
        window.location.href = "userwithE.html?userId=" + userId;
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      msg.style.color = "red";
      msg.textContent = ("Erro ao registrar usuário:", errorCode, errorMessage);
    });
    
}

