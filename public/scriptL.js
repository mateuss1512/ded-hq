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

var auth = firebase.auth();

var db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

var msg = document.getElementById("message");

function loginWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      db.collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
        })
        .then(() => {
          msg.style.color = "green";
          msg.textContent = "Usuário autenticado!";
          window.location.href= "userwithG.html";
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      msg.style.color = "red";
      msg.textContent =
        ("Erro ao autenticar o usuário:", errorCode, errorMessage);
    });
}

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageElement = document.getElementById("message");

function validar() {
  const email = emailInput.value;
  const password = passwordInput.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = userCredential.user.uid;
      messageElement.textContent = `Usuário autenticado com sucesso! UID: ${user.uid}`;
      messageElement.style.color = "green";
      window.location.href = "principal.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      messageElement.textContent = `Erro ao autenticar usuário: ${errorMessage}`;
      messageElement.style.color = "red";
    });
}

