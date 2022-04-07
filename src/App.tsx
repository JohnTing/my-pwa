import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouters } from './component/AppRouters';
import { getAuth, User } from 'firebase/auth';
import { setLoginIn } from './utils/firebase';


function App() {

  return (
  <Router basename='my-pwa' >
    
    <AppRouters></AppRouters>

  </Router>
  );
}

export default App;
