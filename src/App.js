import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Menu from './Menu/Menu';
import HomePage from './Homepage/Homepage';
import LoginPage from './Login/LoginForm';
import SignupPage from './Signup/SignupForm';
import Dashboard from './Dashboard/Dashboard';
import Configure from './Configure/Configure';
import Expenses from './Expenses/Expense';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const tokenExpiryWarning = setTimeout(() => {
      alert('Your session will expire in 20 seconds. Please refresh your token.');
    }, 40000);

    return () => clearTimeout(tokenExpiryWarning);
  }, []);
  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
  
    setAuthenticated(false);
  };

  const handleSignup = () => {
    setAuthenticated(true);
  };

  return (
    <Router>
      <Menu authenticated={authenticated} onLogout={handleLogout} />
      <div className='mainContainer'></div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/configure' element={<Configure/>} />
          <Route path='/expenses' element={<Expenses/>} />
          <Route path='/login' element={authenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={authenticated ? <Navigate to="/dashboard" /> : <SignupPage onSignup={handleSignup} />} />
        </Routes>
    </Router>
  );
};

export default App;
