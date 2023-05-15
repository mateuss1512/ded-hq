
// const firebaseConfig = {
//     apiKey: "AIzaSyACCL9rEfx476t-FMAcNvyrI6UUv3VpiSY",
//     authDomain: "ded-hq-7288b.firebaseapp.com",
//     projectId: "ded-hq-7288b",
//     storageBucket: "ded-hq-7288b.appspot.com",
//     messagingSenderId: "949359359975",
//     appId: "1:949359359975:web:d8ecf544075c739a42ef42",
//     measurementId: "G-9F8MKPXPV7"
// };

// firebase.initializeApp(firebaseConfig);

// const loginForm = document.getElementById('login-form');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const messageElement = document.getElementById('message');

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault(); 

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       messageElement.textContent = `Usuário autenticado com sucesso! UID: ${user.uid}`;
//       messageElement.style.color = 'green';
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       messageElement.textContent = `Erro ao autenticar usuário: ${errorMessage}`;
//       messageElement.style.color = 'red';
//     });
// });