import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import axios from "axios";
import RegistrationCheck from "./RegistrationCheck";
import Links from "./Links";
import "./css/Form.css";

function Register() {
  const [contact, setContact] = useState({
    email: "",
    cemail: "",
    pnum: "",
  });
  const [values, setValue] = useState("");
  const [registered, isRegistered] = useState(true);
  const [error, setError] = useState("");
  const [isMessage, setMessage] = useState(false);
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const isEnabled = contact.email === contact.cemail;
  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ values }, contact.email, contact.pnum);
    axios
      .post(`${process.env.REACT_APP_URL}/registerForum`, {
        registrationData: {
          username: values,
          email: contact.email,
          phone: contact.pnum,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.hasOwnProperty("err")) {
          setError(res.data.err);
        } else if (res.data.hasOwnProperty("message")) {
          setError(res.data.message);
          setMessage(true);
          setContact((prevState) => ({
            ...prevState,
            email: "",
            cemail: "",
            pnum: "",
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="all-items">
      <div className="rforms">
        <form>
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
          <h1 style={{ color: "white" }}> A.R.M.A FORUM REGISTRATION</h1>
          <br />
          <div className="justif">
            <h4>Forum Name: </h4>
            <input
              type="text"
              className="inputboxess"
              placeholder="ForumName"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>Email: </h4>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className="inputboxess"
              value={contact.email}
              placeholder="Email"
            />
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>Confirm Email: </h4>
            <input
              type="email"
              onChange={handleChange}
              name="cemail"
              className="inputboxess"
              value={contact.cemail}
              placeholder="Confirm Email"
            />
          </div>
          <br />
          <h5
            style={{
              display: !isEnabled ? "inline" : "none",
              color: "#ff1744",
              float: "right",
              paddingRight: 50,
            }}
            id="emailHelp"
            className="form-text"
          >
            Enter the same email as above
          </h5>
          <br />
          <br />
          <div className="justif">
            <h4>PhoneNo: </h4>
            <input
              type="text"
              onChange={handleChange}
              className="inputboxess"
              name="pnum"
              value={contact.pnum}
              placeholder="Phone Number"
            />
          </div>
          <br />
          <br />
          <button
            disabled={registered && isEnabled}
            type="submit"
            className="buttonpurple"
            onClick={handleRegister}
          >
            Register
          </button>
          <br />

          <h4 style={{ color: isMessage ? "green" : "#ff1744" }}>{error} </h4>
        </form>
      </div>
    </div>
  );
}

export default Register;
