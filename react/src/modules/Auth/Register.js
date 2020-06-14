import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import axios from "axios";
import RegistrationCheck from "./RegistrationCheck";
import Links from "./Links";
import "./css/Form.css";
import "./css/registrationpage.css";

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
  <div className="register-forms">
    <form>
      <div style={{textAlign:"center"}}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "150px", height: "150px"}}
        />
      </div>
      <h1 style={{ color: "white",textAlign:"center" }}> A.R.M.A Forum Registration</h1>
      <br/>
      <br/>
      <div className="container">
        <div className="row registration-row">
          <div className="col-md registration-text"><h4 style={{paddingTop:"3%" }}>Forum name : </h4></div>
          <div className="col-md"><input
            type="text"
            className="inputboxes"
            placeholder="ForumName"
            onChange={(e) => setValue(e.target.value)}
          /></div>
        </div>
        <div className="row registration-row">
          <div className="col-md registration-text"><h4 style={{paddingTop:"3%" }}>Email : </h4></div>
          <div className="col-md"><input
            type="email"
            onChange={handleChange}
            name="email"
            className="inputboxes"
            value={contact.email}
            placeholder="Email"
          /></div>
        </div>
        <div className="row registration-row">
          <div className="col-md registration-text"><h4 style={{paddingTop:"3%" }}>Confirm email : </h4></div>
          <div className="col-md"><input
            type="email"
            onChange={handleChange}
            name="cemail"
            className="inputboxes"
            value={contact.cemail}
            placeholder="Confirm Email"
          /></div>
        </div>
        <div className="row"><h5
          style={{
            display: !isEnabled ? "inline" : "none",
            color: "#ff1744",
          }}
          id="emailHelp"
          className="form-text"
        >
          Enter the same email as above
        </h5></div>
        <div className="row registration-row">
          <div className="col-md registration-text"><h4 style={{paddingTop:"3%" }}>Phone number : </h4></div>
          <div className="col-md"><input
            type="text"
            onChange={handleChange}
            className="inputboxes"
            name="pnum"
            value={contact.pnum}
            placeholder="Phone Number"
          /></div>
        </div>
      </div>

      <div>
      <br/>
      <button
        disabled={registered && isEnabled}
        type="submit"
        className="buttonpurple"
        onClick={handleRegister}
      >
        Register
      </button>
      </div>
      <br/>
      <h4 style={{ color: isMessage ? "green" : "#ff1744" }}>{error} </h4>
    </form>
  </div>
  );
}

export default Register;
