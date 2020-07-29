import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setLogin, setLoggedUser, status }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/${status}`, {
        username: username,
        password: password,
      })
      .then((response) => {
        window.localStorage.setItem('jwt', response.data.accessToken);
        setLoggedUser(username);
        // redirect to find/saved jobs
        setLogin(true);
        history.push('/');
      })
      .catch((err) => {
        console.log('Error', err);
        // redirect to signup
      });
  };

  return (
    <div className="login-form">
      <h2>{status}</h2>
      <input
        name="username"
        id="username"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        name="password"
        id="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button className="nav-button" onClick={(e) => handleLogin(e)}>
        Submit
      </button>
    </div>
  );
}
