import React from 'react';

import './App.css';
import MyMap from './component/MyMap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignedIn from './component/SignedIn';
import SignInScreen from './component/SignInScreen';


function App() {
  
  return (
  <BrowserRouter basename='my-pwa'>
    <Routes>
        <Route path="map" element={<MyMap/>} />
        <Route path="" element={<SignInScreen />} />
        <Route path="SignInScreen" element={<SignInScreen />} />
        <Route path="SignedIn" element={<SignedIn />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
