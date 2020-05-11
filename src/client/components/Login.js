import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Fade } from "react-bootstrap";
import axios from "axios";

export default function Login({ setUserId, setUserName, status }) {
  const [username, setName] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  console.log(status);

  const handleChange = (event) => {
    event.preventDefault();
    event.persist();
    if (event.target.name === "username") {
      setName(event.target.value);
    } else {
      setPass(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const saveInput = [username, password];
    setName("");
    setPass("");
    axios
      .post(`/api/users/${status}`, {
        username: saveInput[0],
        password: saveInput[1],
      })
      .then((response) => {
        // console.log("Response data", response.data);
        window.localStorage.setItem(
          "jwt",
          JSON.stringify(response.data.accessToken)
        );
        // redirect to find/saved jobs
        setUserName(saveInput[0]);
        history.push("/");
      })
      .catch((err) => {
        console.log("Error", err);
        // redirect to signup
      });
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
