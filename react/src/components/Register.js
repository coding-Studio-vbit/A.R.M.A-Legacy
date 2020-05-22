import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { Alert } from "react-bootstrap";
import axios from "axios";
import RegistrationCheck from "./RegistrationCheck";
import Links from "./Links";

function Register() {
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
  const [contact, setContact] = useState({
    email: "",
    cemail: "",
    pnum: "",
  });
  const [values, setValue] = useState(Forumlist[0]);
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
  const changeStatus = (res) => {
    isRegistered(res);
  };
  const isEnabled = contact.email === contact.cemail;
  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ values }, contact.email, contact.pnum);
    axios
      .post("/registerForum", {
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
      <div className="forms">
        <form>
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
          <h1 style={{ color: "white" }}> A.R.M.A REGISTRATION</h1>

          <div style={{ marginTop: 20 }}></div>
          <br />
          <div className="form-group">
            <span className="form-label" htmlFor="department">
              Forumlist:{" "}
            </span>
            <select
              className="form-control"
              name="value"
              onChange={(e) => setValue(e.target.value)}
            >
              {Forumlist.map((club) => (
                <option> {club} </option>
              ))}
            </select>

            <span className="select-arrow"></span>
          </div>
          <div className="form-group">
            <span className="form-label" htmlFor="email">
              Email:{" "}
            </span>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className="form-control"
              value={contact.email}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <span className="form-label" htmlFor="email">
              Email:{" "}
            </span>
            <input
              type="email"
              onChange={handleChange}
              name="cemail"
              className="form-control"
              value={contact.cemail}
              placeholder="Confirm Email"
            />
            <h5
              style={{
                display: !isEnabled ? "inline" : "none",
                color: "#ff1744",
              }}
              id="emailHelp"
              className="form-text"
            >
              Enter the same email as above
            </h5>
          </div>
          <div className="form-group">
            <span className="form-label" htmlFor="email">
              PhoneNo:{" "}
            </span>
            <input
              type="number"
              onChange={handleChange}
              className="form-control"
              name="pnum"
              value={contact.pnum}
              placeholder="Phone Number"
            />
          </div>
          <br />
          <button
            disabled={registered && isEnabled}
            type="submit"
            className="submit-btn"
            onClick={handleRegister}
          >
            Register
          </button>
          <br />
          <RegistrationCheck value={values} changeRegiValue={changeStatus} />
          {registered && (
            <h4 style={{ color: "green" }}>Forum is registered</h4>
          )}
          <h4 style={{ color: isMessage ? "green" : "#ff1744" }}>{error} </h4>
          <Links value={2} />
        </form>
      </div>
    </div>
  );
}

export default Register;
