
/*
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');


const firebaseConfig = {
  apiKey: "AIzaSyAIbWdjuHHOt2k58QnrWrc61pvMKDK8NZ0",
  authDomain: "fir-1-3536a.firebaseapp.com",
  databaseURL: "https://fir-1-3536a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-1-3536a",
  storageBucket: "fir-1-3536a.appspot.com",
  messagingSenderId: "831281444587",
  appId: "1:831281444587:web:3371b659f337e4ab4470ae",
  measurementId: "G-PB4DSHRZ8F"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});
*/