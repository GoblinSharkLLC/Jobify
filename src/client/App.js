import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavPanel from './components/NavPanel';
import MainPage from './components/MainPage';
import JobContainer from './components/JobContainer';
import Login from './components/Login';

export default function App() {
  const [login, setLogin] = useState(false);
  return (
    <div>
      <NavPanel login={login} setLogin={setLogin} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/jobs" component={JobContainer} />
        <Route
          exact
          path="/login"
          render={() => <Login status="login" setLogin={setLogin} />}
        />
        <Route
          exact
          path="/signup"
          render={() => <Login status="register" setLogin={setLogin} />}
        />
      </Switch>
    </div>
  );
}
