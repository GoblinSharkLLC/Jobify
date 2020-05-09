import React from "react";
import { Link } from "react-router-dom";

export default function NavPanel() {
  return (
    <div className="nav-panel">
      <Link to="/">Find Jobs</Link>
      <Link to="/jobs">Saved Jobs</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
