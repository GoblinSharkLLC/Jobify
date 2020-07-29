import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ login, setLogin, setLoggedUser, loggedUser }) {
  const [userName, setUserName] = useState('');

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jwt = JSON.parse(atob(base64));
    return jwt.username;
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setUserName(parseJwt(jwt));
    }
  }, [login]);

  return (
    <div className="nav-bar">
      <div>
        <Link to="/">
          <img src="src/assets/jobify-logo.png"></img>
        </Link>
      </div>
      {loggedUser ? (
        <div className="v-flex">
          <h3>User: {loggedUser}</h3>
          <Link to="/">
            <button
              className="nav-button"
              onClick={() => {
                setLogin(false);
                setLoggedUser('');
                localStorage.removeItem('jwt');
              }}
            >
              Sign Out
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="nav-button">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}
