import React from "react";
import "../css/App.css";
//import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hdashboard from "./Hdashboard";
import FacultyRegister from "./FacultyRegistration";
import FacultyLogin from "./FacultyLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/facultylogin" component={FacultyLogin} />
            <Route path="/facultyregister" component={FacultyRegister} />
            <Route path="/Hdashboard" component={Hdashboard} />
            <Login />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
