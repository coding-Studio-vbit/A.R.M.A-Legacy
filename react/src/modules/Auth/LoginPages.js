import React from "react";
import logo from "./css/images/logo.png";
import Login from "./Login";
import FacultyLogin from "./FacultyLogin";
import StudentLogin from "./StudentLogin";

const LoginPages = () => {
  return (
    <div className="all-items" style={{ padding: "15px" }}>
      <img src={logo} alt="logo" style={{ width: "180px", height: "180px" }} />
      <br/>
      <br/>
      <StudentLogin />
      <br/>
      <div className="contaier mycontainer">
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-xs-12 login-text">
            <Login />
          </div>
          <br />
          <br />
          <div className="col-lg-6 col-sm-6 col-xs-12 login-text">
            <FacultyLogin />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPages;
