// Register user
function registerUser() {
  const carNumber = document.getElementById('carNumber').value;
  const ownerName = document.getElementById('ownerName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const balance = document.getElementById('balance').value;

  console.log("Registering user with:", { carNumber, ownerName, email, balance });

  // Animate button
  const button = document.querySelector("#registrationSection button");
  animateButton(button);

  // Create user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      console.log("User created with ID:", userId);

      // Save user data to Firebase Realtime Database
      database.ref('users/' + userId).set({
        carNumber: carNumber,
        ownerName: ownerName,
        balance: balance
      })
      .then(() => {
        console.log("User data saved to database");
        document.getElementById('message').innerText = 'User registered successfully!';

        // Hide registration section and show balance management section
        document.getElementById('registrationSection').style.display = "none";
        document.getElementById('balanceSection').style.display = "block";
        document.getElementById('currentBalance').innerText = balance;
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
        document.getElementById('message').innerText = 'Error saving user data: ' + error.message;
      });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      document.getElementById('message').innerText = 'Error: ' + error.message;
    });
}

// Add money to user's balance
function addMoney() {
  const userId = auth.currentUser.uid;
  const amount = parseFloat(document.getElementById('addBalance').value);

  if (isNaN(amount)) {
    document.getElementById('balanceMessage').innerText = "Please enter a valid amount.";
    return;
  }

  // Animate button
  const button = document.querySelector("#balanceSection button");
  animateButton(button);

  // Get current balance
  database.ref('users/' + userId).once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
      const currentBalance = parseFloat(userData.balance);
      const newBalance = currentBalance + amount;

      // Update balance in Firebase
      database.ref('users/' + userId).update({ balance: newBalance })
        .then(() => {
          document.getElementById('currentBalance').innerText = newBalance;
          document.getElementById('balanceMessage').innerText = `Added ${amount}. New balance: ${newBalance}`;
        })
        .catch((error) => {
          console.error("Error updating balance:", error);
          document.getElementById('balanceMessage').innerText = 'Error updating balance: ' + error.message;
        });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      document.getElementById('balanceMessage').innerText = 'Error fetching user data: ' + error.message;
    });
}

// Button animation
function animateButton(button) {
  button.style.transform = "scale(0.95)";
  button.style.backgroundColor = "#218838";
  setTimeout(() => {
    button.style.transform = "scale(1)";
    button.style.backgroundColor = "#28a745";
  }, 100); // Reset after 100ms
}
