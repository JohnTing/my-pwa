/*
import { getMessaging, getToken } from "firebase/messaging";

export function register() {

    console.log("a123")
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.


navigator.serviceWorker.register('/my-pwa/firebase-messaging-sw.js').then((swRegistration) => {
    
    const messaging = getMessaging();
    const vapidKey = 'BMH_PRGL8WPnyUg5DtvvMzIOdex-uEVMYJYj2V9ariIyGxgQeMcTlzYXlqE-NlVLyYn0BARhMsa8nX36f6Tkbtw'
    getToken(messaging, { vapidKey: vapidKey, serviceWorkerRegistration: swRegistration }).then((currentToken) => {
      if (currentToken) {
        console.log({currentToken: currentToken})
        // Send the token to your server and update the UI if necessary
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
    
  })
}
*/
export {}