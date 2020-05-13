import React from "react";
import "../css/App.css";
import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import TemplateDetails from './TemplateDetails';

function App() {
  return (
    <div className="App" >
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route path="/Dashboard/TemplateDetails" component={TemplateDetails}/>
            <Login />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
