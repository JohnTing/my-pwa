// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button, Col, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyAIbWdjuHHOt2k58QnrWrc61pvMKDK8NZ0",
  authDomain: "fir-1-3536a.firebaseapp.com",
  databaseURL: "https://fir-1-3536a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-1-3536a",
  storageBucket: "fir-1-3536a.appspot.com",
  messagingSenderId: "831281444587",
  appId: "1:831281444587:web:3371b659f337e4ab4470ae",
  measurementId: "G-PB4DSHRZ8F"
};
const firebaseapp = firebase.initializeApp(config);



// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.


  const navigate = useNavigate()

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <Row justify="center" align="top">
      <Col>
      <h1>My App</h1>
      <p>Welcome {firebase.auth().currentUser?.email}! You are now signed-in!</p>
      <Space align="center">
      <Button type="primary" size="large" onClick={() => navigate('/SignedIn')}>test</Button>
      <Button type="primary" size="large" onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      </Space>
      </Col>
      </Row>
      
    </div>
  );
}

export default SignInScreen;