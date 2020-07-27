import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import JobContainer from './components/JobContainer';
import Login from './components/Login';

export default function App() {
  const [login, setLogin] = useState(false);
  return (
    <div>
      <NavBar login={login} setLogin={setLogin} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/jobs" component={JobContainer} />
        <Route
          exact
          path="/login"
          render={() => <Login status="Login" setLogin={setLogin} />}
        />
        <Route
          exact
          path="/signup"
          render={() => <Login status="Sign Up" setLogin={setLogin} />}
        />
      </Switch>
    </div>
  );
}
