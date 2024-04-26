import './App.css';
import './style/pos-style.css'
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import LoginForm from './components/LoginForm';
import { TokenContext } from './components/TokenContext';
import POS from './components/POS';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenLogin, setTokenLogin] = useState(null);

  const handleLogin = (isLogin, token) => {
    if (isLogin) {
      setIsLoggedIn(true);
      setTokenLogin(token);
    }
  };


  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <TokenContext.Provider value={tokenLogin}>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Main /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/main"
          element={isLoggedIn ? <Main /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/pos"
          element={isLoggedIn ? <POS /> : <Navigate to="/login" replace />}
        />
        
      </Routes>
    </TokenContext.Provider>
  );
}

export default App;