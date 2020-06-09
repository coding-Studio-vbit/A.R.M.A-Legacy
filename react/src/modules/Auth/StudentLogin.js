import React from "react";
import axios from "axios";
import "./css/Form.css";
const StudentLogin = () => {
  return (
    <div className="all-items">
      <div className="sforms">
        <form>
          <h1 style={{ color: "white" }}> Student Portal</h1>
          <div
            className="container mycontainer"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <div className="row">
              <div className="col justi">
                <h4> RollNo:</h4>
                <input
                  type="password"
                  className="inputboxes"
                  placeholder="Password"
                  //   onChange={(e) => setPassword(e.target.value)} onClick={handleLogin}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-xs-12 ">
                <button className="buttonpurple" type="submit">
                  Go
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
