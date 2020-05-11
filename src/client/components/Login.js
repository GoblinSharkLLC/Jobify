import React, { useState } from 'react';
import { Form, Button, Fade } from 'react-bootstrap';
import axios from 'axios';

export default function Login({ setUserId, setUserName }) {
  //console.log(typeof setUserName, typeof setUserId);
  const [username, setName] = useState('');
  const [password, setPass] = useState('');
  const handleChange = (event) => {
    event.preventDefault();
    event.persist();
    console.log(username, password);
    if (event.target.name === 'username') {
      setName(event.target.value);
    } else {
      setPass(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    let saveInput = [username, password];
    setName('');
    setPass('');
    console.log(saveInput);
    try {
      await axios.post('/api/users/login', {
        username: saveInput[0],
        password: saveInput[1],
      });
      saveInput = [];
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={username}
            placeholder="Enter username"
            onInput={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onInput={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
