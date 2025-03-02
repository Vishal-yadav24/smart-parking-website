// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyBBa7lSWg-dpgFo2w--3zaCLmwOnUmI1T8",
    authDomain: "parkingsystem-5428f.firebaseapp.com",
    databaseURL: "https://parkingsystem-5428f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "parkingsystem-5428f",
    storageBucket: "parkingsystem-5428f.firebasestorage.app",
    messagingSenderId: "964306024204",
    appId: "1:964306024204:web:2de8f6b17437a2590bfb29"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const auth = firebase.auth();
