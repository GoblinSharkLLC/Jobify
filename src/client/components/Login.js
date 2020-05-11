import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Fade } from 'react-bootstrap';
import axios from 'axios';

export default function Login({ setLogin, status }) {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    let form = event.target;
    axios
      .post(`/api/users/${status}`, {
        username: form.elements.username.value,
        password: form.elements.password.value,
      })
      .then((response) => {
        // console.log("Response data", response.data);
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
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
