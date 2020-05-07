import React from "react";
import "../css/App.css";
import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/loginForm" component={Login} />
            <Route path="/register" component={Register} />

            <Login />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
