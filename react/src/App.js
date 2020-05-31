import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import LoginRoutes from "./helpers/LoginRoutes";

//Dashboard Routes
import DashboardRoutes from "./helpers/DashboardRoutes";

import RequestRoutes from "./helpers/RequestRoutes";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <div>
            <LoginRoutes/>
            <DashboardRoutes/>
            <RequestRoutes/>
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
