// Register user
function registerUser() {
    const carNumber = document.getElementById('carNumber').value;
    const ownerName = document.getElementById('ownerName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const balance = document.getElementById('balance').value;
  
    // Create user with email and password
    firebase.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
  
        // Save user data to Firebase Realtime Database
        firebase.database.ref('users/' + userId).set({
          carNumber: carNumber,
          ownerName: ownerName,
          balance: balance
        });
  
        document.getElementById('message').innerText = 'User registered successfully!';
      })
      .catch((error) => {
        document.getElementById('message').innerText = 'Error: ' + error.message;
      });
  }