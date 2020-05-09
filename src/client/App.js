import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavPanel from './components/NavPanel';
import MainPage from './components/MainPage';
import JobContainer from './components/JobContainer';
import Login from './components/Login';

export default function App() {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  return (
    <div>
      <NavPanel />
      <Switch>
        <Route exact path="/" component={MainPage} userName={userName} />
        <Route exact path="/jobs" component={JobContainer} userId={userId} />
        <Route
          exact
          path="/login"
          component={Login}
          setUserId={setUserId}
          setUserName={setUserName}
        />
      </Switch>
    </div>
  );
}
