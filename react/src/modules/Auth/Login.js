import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./css/Form.css";
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
  const userType = "FORUM";
  return (
    <div className="all-items">
      <div className="forms">
        <form>
          <h1 style={{ color: "white" }}> Forum login </h1>

          <div style={{ marginTop: 20 }}></div>
          <br />
          <div className="form-group justi">
            <h4 style={{ paddingLeft: 20 }}>Forum List: </h4>
            <select
              className="selecti round"
              name="value"
              onChange={(e) => ForumChangeHandler(e)}
            >
              {ForumList.map((club) => (
                <option> {club.actual_name} </option>
              ))}
            </select>
          </div>
          <div style={{ height: 20 }}></div>
          <div className="form-group ipflex justi">
            <h4 style={{ paddingLeft: 20 }}> Password: </h4>
            <input
              type="password"
              className="inputboxes"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              paddingTop: 2,
              paddingRight: 67,
            }}
          >
            <button
              className="btn btn-link"
              style={{ color: "#cc00ff" }}
              onClick={() => setModalShow(true)}
              type="button"
            >
              Forgot Password
            </button>
          </div>
          <br />
          <button className="buttonpurple" onClick={handleLogin} type="submit">
            Login
          </button>

          <h4 style={{ color: "#ff1744" }}>{error} </h4>
          <Link
            to={"/register"}
            style={{ display: "block", marginTop: 20, color: "#00e676" }}
          >
            Go to Forum Registration Page
          </Link>
        </form>
      </div>
      <ForgotPasswordForum
        userType={userType}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Login;
