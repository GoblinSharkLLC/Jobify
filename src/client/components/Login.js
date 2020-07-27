import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setLogin, status }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/${status}`, {
        username: username,
        password: password,
      })
      .then((response) => {
        window.localStorage.setItem('jwt', response.data.accessToken);
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
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>

    // return (
    //   <div className="login-form">
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group controlId="formBasicEmail">
    //         <Form.Label>Username</Form.Label>
    //         <Form.Control name="username" placeholder="Enter username" />
    //       </Form.Group>

    //       <Form.Group controlId="formBasicPassword">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //         />
    //       </Form.Group>

    //       <Button variant="primary" type="submit">
    //         Submit
    //       </Button>
    //     </Form>
    //   </div>
  );
}
