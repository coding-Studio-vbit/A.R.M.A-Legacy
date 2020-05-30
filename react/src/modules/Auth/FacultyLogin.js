import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "./images/logo.png";
import Links from "./Links";
import "./css/Form.css";

const FacultyLogin = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");
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
  const isEnabled = password.length > 0 && rollNo.length >= 10;
  return (
    <div className="all-items">
      <div className="forms">
        <form>
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <br />
          <h1 style={{ color: "white" }}> A.R.M.A LOGIN </h1>

          <div style={{ marginTop: 20 }}></div>
          <br />
          <div className="form-group">
            <span className="form-label" htmlFor="Password">
              RollNo:{" "}
            </span>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="RollNo"
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <span className="form-label" htmlFor="Password">
              Password:{" "}
            </span>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />
          <button
            type="submit"
            disabled={!isEnabled}
            className="submit-btn"
            onClick={handleLogin}
          >
            Login
          </button>
          <br />
          <h4 style={{ color: "#ff1744" }}>{error} </h4>
          <Links value={3} />
        </form>
      </div>
    </div>
  );
};

export default FacultyLogin;
