import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link, Redirect } from "react-router-dom";
import "./css/Form.css";
import "./css/login.css";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordForum from "./ForgotPasswordForum";
const Login = () => {
  const [ForumList, updateForumList] = useState([]);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
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
        setValue(ResForums[0].actual_name);
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
        } else {
          let errors = res.data.err;
          setError(errors);
        }
      })
      .catch((err) => console.log(err));
      return <Redirect to='/Dashboard' />
  };
  const ForumChangeHandler = (e) => {
    let theForum = e.target.value.toUpperCase();
    setValue(theForum);
  };
  const userType = "FORUM";
  return (
  <div className="forms">
    <form>
      <h1 style={{ color: "white" }}> Forum login </h1>
      <br/>
      <div className="container">
        <div className="form-group login-row row">
          <div className="col-md login-text"><h4 style={{paddingTop:"3%" }}>Forum : </h4></div>
          <div className="col-md"><select
            className="login-dropdown round"
            style={{margin:0}}
            name="value"
            onChange={(e) => ForumChangeHandler(e)}
          >
            {ForumList.map((club) => (<option> {club.actual_name} </option>))}
          </select></div>
        </div>
        <div className="form-group login-row row">
          <div className="col-md login-text"><h4 style={{paddingTop:"3%" }}>Password : </h4></div>
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
            onClick={() => setModalShow(true)}
            type="button"
          >
            Forgot Password
          </button>
        </div>
      </div>

      <br/>
      <button className="buttonpurple" onClick={handleLogin} type="submit">
        Login
      </button>

      <h4 style={{ color: "#ff1744" }}>{error} </h4>
      <Link
        to={"/register"}
        style={{ color: "#00e676" }}
      >
        Go to Forum Registration Page
      </Link>
    </form>
  <ForgotPasswordForum
    userType={userType}
    show={modalShow}
    onHide={() => setModalShow(false)}
  />
  </div>
  );
};

export default Login;
