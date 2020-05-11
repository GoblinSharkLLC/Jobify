import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, Col, Button } from 'react-bootstrap';

export default function NavPanel({ login, setLogin }) {
  const [userName, setUserName] = useState('');

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jwt = JSON.parse(atob(base64));
    // console.log('Parsed Jwt before return', jwt);
    return jwt.username;
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // console.log(jwt);
    // console.log('parsed response', parseJwt(jwt));
    if (jwt) {
      setUserName(parseJwt(jwt));
    }
    // console.log('userName', userName);
  }, [login]);

  return (
    <div>
      <div>
        <Navbar bg="light">
          <Col xs={1} />
          <Col xs={2} />
          <Col>
            <Button variant="outline-secondary" as={Link} to="/">
              Find Jobs
            </Button>
          </Col>
          <Col>
            <Navbar.Brand className="h1">Jobly</Navbar.Brand>
          </Col>
          <Button variant="outline-secondary" as={Link} to="/jobs">
            Saved Jobs
          </Button>
          <Col xs={2} />
          <Col xs={1}>
            {userName ? (
              <NavItem>{userName}</NavItem>
            ) : (
              <div>
                <Button variant="outline-primary" as={Link} to="/login">
                  Log In
                </Button>
                <Button variant="outline-primary" as={Link} to="/signup">
                  Sign Up
                </Button>
              </div>
            )}
          </Col>
        </Navbar>
      </div>
    </div>
  );
}
