import React from "react";
import "../css/App.css";
import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hdashboard from "./Hdashboard";
import Fdash from "./fdashboard";

function App() {
  return (
    <div className="App" >
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/Hdashboard" component={Hdashboard} />
            <Route path="/fdashboard" component={Fdash}/>
            <Login />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
