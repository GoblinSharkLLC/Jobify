import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavPanel from "./components/NavPanel";
import MainPage from "./components/MainPage";
import JobContainer from "./components/JobContainer";
import Login from "./components/Login";

export default function App() {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [jwt, setUserJwt] = useState(localStorage.getItem("jwt"));
  return (
    <div>
      <NavPanel />
      <Switch>
        <Route exact path="/" component={MainPage} userName={userName} />
        <Route exact path="/jobs" component={JobContainer} userId={userId} />
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              setUserId={setUserId}
              setUserName={setUserName}
              status="login"
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => <Login setUserName={setUserName} status="register" />}
        />
      </Switch>
    </div>
  );
}
