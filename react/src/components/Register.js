import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import RegistrationCheck from "./RegistrationCheck";

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
    "ISE",
  ];
  const [contact, setContact] = useState({
    email: "",
    cemail: "",
    pnum: "",
  });
  const [values, setValue] = useState(Forumlist[0]);
  const [registered, isRegistered] = useState(true);
  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  const changeStatus = (res) => {
    isRegistered(res);
  };
  const isEnabled = contact.email === contact.cemail;
  const handleRegister = (e) => {
    console.log({ values }, contact.email, contact.pnum);
    axios
      .post("/registerForum", {
        registrationData: {
          username: values,
          email: contact.email,
          phone: contact.pnum,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="mine" style={{ display: "block" }}>
      <img src={logo} alt="logo" style={{ width: "150px", height: "150px" }} />
      <h1>A.R.M.A Registration</h1>
      <br />
      <form>
        <br />
        <Dropdown>
          <Dropdown.Toggle>{values}</Dropdown.Toggle>
          <Dropdown.Menu>
            {Forumlist.map((club) => (
              <Dropdown.Item onSelect={() => setValue(club)}>
                {club}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <div className="form-group">
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
            }}
            id="emailHelp"
            className="form-text"
          >
            Enter the same email as above
          </h5>
        </div>
        <br />
        <div className="form-group">
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
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Register
        </button>
        <br />
        <Link to={"/login"} style={{ display: "block", marginTop: 20 }}>
          Go to Login Page
        </Link>
      </form>
      <br />
      <RegistrationCheck value={values} changeRegiValue={changeStatus} />
      {registered && <h4 style={{ color: "green" }}>Forum is registered</h4>}
    </div>
  );
}

export default Register;
