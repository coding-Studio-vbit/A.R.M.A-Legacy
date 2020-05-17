import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import RegistrationCheck from "./RegistrationCheck";

const Login = () => {
  const Forumlist = [
    "codingStudio",
    "stumagz",
    "IEEE-Vbit",
    "RoboticsClub",
    "EcoClub",
    "StreetCause",
    "VBIT-MUN",
    "Stutalk",
  ];
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(Forumlist[0]);
  const [registered, isRegistered] = useState(false);
  const handleLogin = () => {
    let un = value;
    let pw = password;
    axios
      .post("/login", {
        user: {
          username: un,
          password: pw,
        },
      })
      .then((res) => {
        console.log(res);
        let userName = res.data.message.split(" ")[1];
        let accessToken = res.data.accessToken;
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: userName,
            accessToken: accessToken,
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const changeStatus = (res) => {
    isRegistered(res);
  };
  const isEnabled = password.length > 0 && registered;

  return (
    <div className="mine">
      <img src={logo} alt="logo" style={{ width: "150px", height: "150px" }} />
      <br />
      <h1> A.R.M.A Login </h1>
      <div style={{ marginTop: 20 }}></div>
      <Dropdown>
        <Dropdown.Toggle>{value}</Dropdown.Toggle>
        <Dropdown.Menu>
          {Forumlist.map((club) => (
            <Dropdown.Item
              onSelect={() => {
                setValue(club);
              }}
            >
              {club}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ marginTop: 20 }}></div>
      <form>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
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
          disabled={!isEnabled}
          className="btn btn-primary"
          onClick={handleLogin}
          type="button"
        >
          Login
        </button>
      </form>
      <br />
      <Link to={"/register"} style={{ display: "block", marginTop: 20 }}>
        Go to Regististration Page
      </Link>
      <br />
      <RegistrationCheck value={value} changeRegiValue={changeStatus} />
      {!registered && <h4 style={{ color: "red" }}>Forum is not registered</h4>}
    </div>
  );
};

export default Login;
