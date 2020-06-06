import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "./images/logo.png";
import Links from "./Links";
import "./css/Form.css";

const Login = () => {
  const [ForumList, updateForumList] = useState([]);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/getRegisteredForums`)
      .then((res) => {
        let ResForums = res.data;
        updateForumList(ResForums);
        setValue(ResForums[0].actual_name.toUpperCase());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    let un = value;
    let pw = password;
    // console.log(un, pw);
    axios
      .post(`${process.env.REACT_APP_URL}/login`, {
        user: {
          username: un,
          password: pw,
        },
      })
      .then((res) => {
        console.log(res);
        if (!res.data.hasOwnProperty("err")) {
          console.log("fdf");
          let userName = res.data.message.split(" ")[1];
          let accessToken = res.data.accessToken;
          localStorage.setItem(
            "user",
            JSON.stringify({
              userName: userName,
              accessToken: accessToken,
            })
          );
          history.push("/dashboard");
        } else {
          let errors = res.data.err;
          setError(errors);
        }
      })
      .catch((err) => console.log(err));
  };
  const ForumChangeHandler = (e) => {
    let theForum = e.target.value.toUpperCase();
    setValue(theForum);
  };

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
            <span className="form-label" htmlFor="Forumlist">
              Forumlist:{" "}
            </span>
            <select
              className="form-control"
              name="value"
              onChange={(e) => ForumChangeHandler(e)}
            >
              {ForumList.map((club) => (
                <option> {club.actual_name} </option>
              ))}
            </select>

            <span className="select-arrow"></span>
          </div>

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
          <button className="submit-btn" onClick={handleLogin} type="submit">
            Login
          </button>

          <br />
          <h4 style={{ color: "#ff1744" }}>{error} </h4>
          <Links value={1} />
        </form>
      </div>
    </div>
  );
};

export default Login;
