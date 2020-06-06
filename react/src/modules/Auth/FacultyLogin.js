import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./css/Form.css";
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
	const usertype = "FORUM" ;
  const isEnabled = password.length > 0 && rollNo.length >= 10;
  return (
    <div className="all-items">
      <div className="forms">
        <form>
          <h1 style={{ color: "white" }}> Faculty login </h1>

          <div style={{ marginTop: 20 }}></div>
          <br />
          <div className="form-group justi">
            <h4 style={{ paddingLeft: 20 }}> RollNo: </h4>
            <input
              type="text"
              className="inputboxes"
              id="exampleInputPassword1"
              placeholder="RollNo"
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
          <div style={{ height: 20 }}></div>
          <div className="form-group justi">
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
              type="button"
              onClick={() => setModalShow(true)}
            >
              Forgot Password
            </button>
          </div>
          <div style={{ height: 5 }}></div>
          <button
            type="submit"
            disabled={!isEnabled}
            className="buttonpurple"
            onClick={handleLogin}
          >
            Login
          </button>
          <div style={{ height: 10 }}></div>
          <h4 style={{ color: "#ff1744" }}>{error} </h4>
          <Link
            to={"/facultyregister"}
            style={{ display: "block", marginTop: 20, color: "#00e676" }}
          >
            Go to Faculty Registration Page
          </Link>
        </form>
      </div>
      <ForgotPassword userType={usertype} show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default FacultyLogin;
