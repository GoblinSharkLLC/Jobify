import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ login, setLogin }) {
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
      <div>
        <Link to="/login">
          <button className="nav-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="nav-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );

  /*return (
    <div>
      <div>
        <Navbar bg="light">
          <Col>
            <Navbar.Brand className="h1">Jobly</Navbar.Brand>
          </Col>
          <Col>
            <Button variant="outline-secondary" as={Link} to="/">
              Find Jobs
            </Button>
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
  );*/
}
