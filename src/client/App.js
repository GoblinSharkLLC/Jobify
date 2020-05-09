import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavPanel from "./components/NavPanel";
import MainPage from "./components/MainPage";
import JobContainer from "./components/JobContainer";
import Login from "./components/Login";

export default function App() {
  return (
    <div>
      <NavPanel />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/jobs" component={JobContainer} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}
