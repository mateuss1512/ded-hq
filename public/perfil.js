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

        if (userData.hasOwnProperty('profile')) {
          const imageElement = document.getElementById('profile-img');
          imageElement.src = userData.profile;
          document.getElementById('label').style.display = 'none';
          document.getElementById('profile-input').style.display = 'none';
          document.getElementById('btn1').style.display = 'none';
          document.getElementById('btn2').style.display = 'none';
        } else {
          const defaultProfileImage = 'https://static.wikia.nocookie.net/3c9929a3-0314-4f3b-b3a6-e195d264bc05';
          const imageElement = document.getElementById('profile-img');
          imageElement.src = defaultProfileImage;
        }

      } else {
        console.log("Nome de usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao recuperar o nome do usuário:", error);
    });
}

const accessKey = 'XaEKMY_1xTJ4O_ZnlJYArLpORUeZ7wW3LrRReAyC4_E';
const apiUrl = 'https://api.unsplash.com/photos/random';
var generatedImg;

async function gerarImagem(inputText) {
  const response = await fetch(`${apiUrl}?query=${encodeURIComponent(inputText)}`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  const data = await response.json();

  if (data.errors) {
    console.error('Erro ao obter a imagem:', data.errors);
    return;
  }

  const imageUrl = data.urls.regular;
  generatedImg = imageUrl;

  const imageElement = document.getElementById('profile-img');
  imageElement.src = imageUrl;
}

function salvar() {
  const myCollection = firestore.collection("users").doc(userId);

  myCollection.update({
    profile: generatedImg,
  });

  document.getElementById('label').style.display = 'none';
  document.getElementById('profile-input').style.display = 'none';
  document.getElementById('btn1').style.display = 'none';
  document.getElementById('btn2').style.display = 'none';
  document.getElementById('btn3').style.display = 'block';
}

function atualizarImg() {
  document.getElementById('label').style.display = 'block';
  document.getElementById('profile-input').style.display = 'block';
  document.getElementById('btn1').style.display = 'block';
  document.getElementById('btn2').style.display = 'block';
  document.getElementById('btn3').style.display = 'none';
}

