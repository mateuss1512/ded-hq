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

var database = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();

// Função que será chamada quando o botão de login com Google for clicado
function loginWithGoogle() {
    // Abre o pop-up de autenticação do Google
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // O usuário foi autenticado com sucesso
            const user = result.user;
            console.log("Usuário autenticado:", user);
            database.ref('users/' + user.uid).set({
                email: user.email,
                displayName: user.displayName
            });
            localStorage.setItem("chave",""+user.uid);

            // Redireciona para a página index.html
            redirecionarParaIndex();
        })
        .catch((error) => {
            // Ocorreu um erro na autenticação
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Erro ao autenticar o usuário:", errorCode, errorMessage);
        });
}


function redirecionarParaIndex() {
    window.location.href = "principal.html";
}

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');

function validar() {

  const email = emailInput.value;
  const password = passwordInput.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      messageElement.textContent = `Usuário autenticado com sucesso! UID: ${user.uid}`;
      messageElement.style.color = 'green';
      window.location.href = "principal.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      messageElement.textContent = `Erro ao autenticar usuário: ${errorMessage}`;
      messageElement.style.color = 'red';
    });
}