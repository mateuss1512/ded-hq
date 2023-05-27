// Inicializar o Firebase
var db = firebase.firestore();

var userId;

displayStock();

function set() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userId = user.uid;
      const usersDocRef = db.collection("users").doc(userId);
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

function addToCart(item) {
  var cartItems = document.getElementById('cart-items');
  var li = document.createElement('li');
  li.textContent = item + ' '; 
  var removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.addEventListener('click', function() {
    li.remove();
  });
  li.appendChild(removeButton);
  cartItems.appendChild(li);
}

function checkout() {
    var cartItems = document.getElementById('cart-items');
    var items = [];
    cartItems.querySelectorAll('li').forEach(function(li) {
      items.push(li.textContent);
    });
  
    var cardNumber = document.getElementById('card-number').value;
    var cardExpiry = document.getElementById('card-expiry').value;
    var cardCVV = document.getElementById('card-cvv').value;
    var cardName = document.getElementById('card-name').value;
    var cardCpf = document.getElementById('card-cpf').value;
  
    if (!cardNumber || !cardExpiry || !cardCVV) {
      alert('Por favor, preencha todos os campos de pagamento.');
      return;
    }

    if (cardNumber.length !== 16) {
        alert('Número do cartão inválido');
        return;
      }
    
    if (cardCpf.lenght < 11) {
        alert('Número do CPF inválido');
        return;
    }

    if (!validateCardExpiry(cardExpiry)) {
        alert('Validade do cartão inválida');
        return;
      }

      if (!cardCVV.match(/^[0-9]{3,4}$/)) {
        alert('CVV inválido');
        return;
      }    
  
      updateStock(items);

      var orderId = generateRandomId();
      
    var user = firebase.auth().currentUser;
    
    if (user) {
      var userData = {
        email: user.email,
      };
  
      db.collection('pedidos').doc(orderId).set({
        user: userData,
        items: items,
        cardName: cardName,
        cardCpf: cardCpf,
        cardNumber: cardNumber,
        cardExpiry: cardExpiry,
        cardCVV: cardCVV,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log('Pedido salvo com sucesso!');
        cartItems.innerHTML = '';
        alert('Compra realizada com sucesso!');
        document.getElementById('payment-form').reset();
        displayStock();
        window.location.href = "obrigado.html";
      })
      .catch(function(error) {
        console.error('Erro ao salvar o pedido:', error);
        alert('Erro ao finalizar a compra. Por favor, tente novamente.');
      });
    } else {
      alert('Nenhum usuário autenticado. Faça login para concluir a compra.');
    }
  }

  function generateRandomId() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  function updateStock(items) {
    items.forEach(function(item) {
      db.collection('produtos').doc(item).update({
        quantidade: firebase.firestore.FieldValue.increment(-1)
      });
    });
  }
  
  function updateStockCount() {
    db.collection('produtos').get().then(function(querySnapshot) {
      var stockCount = 0;
      querySnapshot.forEach(function(doc) {
        stockCount += doc.data().quantidade;
      });
      var stockCountElement = document.getElementById('stock-count');
      stockCountElement.textContent = 'Quantidade em estoque: ' + stockCount;
    });
  }

  function displayStock() {
    var products1 = document.getElementById('stock-dados');
    var products2 = document.getElementById('stock-livro-monstros');
    var products3 = document.getElementById('stock-livro-jogador');
    var products4 = document.getElementById('stock-escudo-mestre');
    
    db.collection('produtos')
    .where('nome', '==', 'Dados')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var productData = doc.data();
        var productStock = productData.quantidade;

        products1.textContent = 'Estoque: ' + productStock;
      });
    });
    db.collection('produtos')
    .where('nome', '==', 'Livro dos Monstros')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var productData = doc.data();
        var productStock = productData.quantidade;

        products2.textContent = 'Estoque: ' + productStock;
      });
    });
    db.collection('produtos')
    .where('nome', '==', 'Livro do Jogador')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var productData = doc.data();
        var productStock = productData.quantidade;

        products3.textContent = 'Estoque: ' + productStock;
      });
    });
    db.collection('produtos')
    .where('nome', '==', 'Escudo do Mestre')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var productData = doc.data();
        var productStock = productData.quantidade;

        products4.textContent = 'Estoque: ' + productStock;
      });
    });
  }

  function validateCardExpiry(expiryDate) {
    var today = new Date();
    var selectedDate = new Date(expiryDate);
  
    if (selectedDate < today) {
      return false;
    }
  
    return true;
  }
  
  

