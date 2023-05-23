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



firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});
