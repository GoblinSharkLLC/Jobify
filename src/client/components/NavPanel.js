import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

export default function NavPanel() {
  return (
    <div>
      <div>
        <Navbar bg="light">
          <Navbar.Brand as={Link} to="/">
            Jobly
          </Navbar.Brand>
          {/* <Link to="/">Find Jobs</Link> */}
          {/* <Link to="/jobs">Saved Jobs</Link>
        <Link to="/login">Login</Link> */}
        </Navbar>
      </div>
    </div>
  );
}
