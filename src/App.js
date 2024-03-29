import React, { useState } from 'react';
import Login from './components/Login';
import Management from './components/Management';
import './css/styles.css';

function App() {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [account, setAccount] = useState([]);
  const handleLoginState = (status, account) => {
    setLoginStatus(status);
    setAccount(account);
  }
  return (
    <div className={`apps-wrapper ${isLoggedIn ? 'overrides' : ''}`}>
      {!isLoggedIn ? <Login isLoginState={handleLoginState} /> : ''}
      {isLoggedIn ? <Management isLoginState={handleLoginState} account={account}/> : ''}
    </div>
  );
}

export default App;
