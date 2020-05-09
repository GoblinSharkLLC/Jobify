import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavPanel from "./components/NavPanel";
import MainPage from "./components/MainPage";

export default function App() {
  return (
    <Router>
      <div>
        <NavPanel />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/jobs" component={JobContainer} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}
