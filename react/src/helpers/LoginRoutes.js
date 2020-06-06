
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Login Components
import Login from "../modules/Auth/Login";
import Register from "../modules/Auth/Register";
import FacultyRegister from "../modules/Auth/FacultyRegistration";
import FacultyLogin from "../modules/Auth/FacultyLogin";

const LoginRoutes = () => {
  return(
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/facultylogin" component={FacultyLogin} />
      <Route path="/facultyregister" component={FacultyRegister} />
    </div>
  );
}

export default LoginRoutes;
