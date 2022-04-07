// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Col, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { EmailAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],

  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(!!getAuth().currentUser); // Local signed-in state.

  const navigate = useNavigate()

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(getAuth(), user => {
      setIsSignedIn(!!user);
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);



  return (
    <div>
      <Row justify="center" align="top">
        <Col>
        
        {!isSignedIn &&
            <>
              <h1>My App</h1>
              <p>Please sign-in:</p>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
            </>
          }

          {isSignedIn &&
            <>
              <p>Welcome {getAuth().currentUser?.email}! You are now signed-in!</p>
              <Space align="center">
                <Button type="primary" size="large" onClick={() => navigate('/')}>test</Button>
                <Button type="primary" size="large" onClick={() => getAuth().signOut()}>Sign-out</Button>
              </Space>
            </>
          }
        </Col>
      </Row>

    </div>
  );
}

export default SignInScreen;