
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";


export default function SignedIn() {

    const [user, setUser] = useState(firebase.auth().currentUser); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setUser(user);
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);






  return (<h1>Name: {user?.email} <br/>  </h1>);
}
