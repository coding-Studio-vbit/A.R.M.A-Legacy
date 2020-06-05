import React from "react";
import logo from "./images/logo.png";
import Login from "./Login";
import FacultyLogin from "./FacultyLogin";

const LoginPages = () => {
  return (
    <div className="all-items" style={{ padding: "15px" }}>
      <img src={logo} alt="logo" style={{ width: "180px", height: "180px" }} />

      <div className="contaier mycontainer">
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-xs-12 ">
            <Login />
          </div>
          <br />
          <br />
          <div className="col-lg-6 col-sm-6 col-xs-12 ">
            <FacultyLogin />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPages;
