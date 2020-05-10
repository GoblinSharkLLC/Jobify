import React from "react";
import { Form, Button, Fade } from "react-bootstrap";

export default function Login({ setUserId, setUserName }) {
  console.log(typeof setUserName, typeof setUserId);
  return (
    <div className="login">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
