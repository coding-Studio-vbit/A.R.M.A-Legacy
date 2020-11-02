import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import "../../css/styles.css";
import ForgotPassword from "./ForgotPassword";
const FacultyLogin = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/loginFaculty`, {
        user: {
          username: rollNo,
          password: password,
        },
      })
      .then((res) => {
        console.log(res);
        if (!res.data.hasOwnProperty("err")) {
          let userName = res.data.message.split(" ")[1];
          let accessToken = res.data.accessToken;
          localStorage.setItem(
            "user",
            JSON.stringify({
              userName: userName,
              accessToken: accessToken,
              userType: usertype,
            })
          );
          history.push("/Dashboard");
        } else {
          let errors = res.data.err;
          setError(errors);
        }
      })
      .catch((err) => console.log(err));
  };
  const usertype = "FACULTY";
  const isEnabled = password.length > 0 && rollNo.length >= 10;
  return (
    <div className="authforms">
      <form>
        <h1 style={{ color: "white" }}> Faculty login </h1>
        <br />
        <div className="container">
          <div className="form-group login-row row">
            <div className="col-md login-text">
              <h4 style={{ paddingTop: "3%" }}>Roll number : </h4>
            </div>
            <div className="col-md">
              <input
                type="text"
                className="inputboxes"
                id="exampleInputPassword1"
                placeholder="RollNo"
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group login-row row">
            <div className="col-md login-text">
              <h4 style={{ paddingTop: "3%" }}>Password : </h4>
            </div>
            <div className="col-md">
              <input
                type="password"
                className="inputboxes"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <button
              className="btn btn-link"
              style={{ color: "#cc00ff" }}
              type="button"
              onClick={() => setModalShow(true)}
            >
              Forgot Password
            </button>
          </div>
        </div>

        <br />
        <button className="buttonpurple" onClick={handleLogin} type="submit">
          Login
        </button>

        <h4 style={{ color: "#ff1744" }}>{error} </h4>
        <Link to={"/facultyregister"} style={{ color: "#00e676" }}>
          Go to Faculty Registration Page
        </Link>
      </form>
      <ForgotPassword
        userType={usertype}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default FacultyLogin;
