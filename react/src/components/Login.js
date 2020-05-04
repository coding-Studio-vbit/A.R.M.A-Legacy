import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("Select a forum");

  const stutt = () => {
    const data = { password };
    axios
      .post("/hashpassword", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const isEnabled = password.length > 0;
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
            <Dropdown.Item onSelect={() => setValue(club)}>
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
          onClick={stutt}
        >
          Login
        </button>
      </form>
      <br />
      <Link to={"/register"} style={{ display: "block", marginTop: 20 }}>
        Register
      </Link>
    </div>
  );
};

export default Login;
