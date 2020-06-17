import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import axios from "axios";
import "./css/Form.css";
import "./css/registrationpage.css";

const FacultyRegister = () => {
  const [dept, setDept] = useState("CSE");
  const [isMessage, setMessage] = useState(false);
  const [contact, setContact] = useState({
    rollNo: "",
    name: "",
    email: "",
    cemail: "",
    pnum: "",
  });
  const [error, setError] = useState("");
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
  const isPhone = contact.pnum.length === 10;
  const disable = isEnabled && isPhone;
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/registerFaculty`, {
        registrationData: {
          faculty_name: contact.name,
          faculty_dept: dept,
          faculty_roll: contact.rollNo,
          faculty_email: contact.email,
          faculty_phone: contact.pnum,
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
            rollNo: "",
            name: "",
            email: "",
            cemail: "",
            pnum: "",
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  //
  const deptList = ["CSE", "IT", "EEE", "ECE", "MECH", "CIVIL", "MBA"];
  return (
    <div className="register-forms">
      <form>
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <h1 style={{ color: "white", textAlign: "center" }}>
          {" "}
          A.R.M.A Faculty Registration
        </h1>
        <br />
        <br />
        <div className="container">
          <div className="row registration-row">
            <div className="col-md registration-text">
              <h4 style={{ paddingTop: "3%" }}>Roll No : </h4>
            </div>
            <div className="col-md">
              <input
                type="text"
                onChange={handleChange}
                name="rollNo"
                className="inputboxes"
                value={contact.rollNo}
                placeholder="Roll Number"
              />
            </div>
          </div>
          <div className="row registration-row">
            <div className="col-md registration-text">
              <h4 style={{ paddingTop: "3%" }}>Name : </h4>
            </div>
            <div className="col-md">
              <input
                type="text"
                onChange={handleChange}
                name="name"
                className="inputboxes"
                value={contact.name}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="row registration-row">
            <div className="col-md registration-text">
              <h4 style={{ paddingTop: "3%" }}>Department : </h4>
            </div>
            <div className="col-md">
              <select
                className="login-dropdown round"
                name="value"
                onChange={(e) => setDept(e.target.value)}
              >
                {deptList.map((depts) => (
                  <option> {depts} </option>
                ))}
              </select>

              <span className="select-arrow"></span>
            </div>
          </div>
          <div className="row registration-row">
            <div className="col-md registration-text">
              <h4 style={{ paddingTop: "3%" }}>Email : </h4>
            </div>
            <div className="col-md">
              <input
                type="email"
                onChange={handleChange}
                name="email"
                className="inputboxes"
                value={contact.email}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="row registration-row">
            <div className="col-md registration-text">
              <h4 style={{ paddingTop: "3%" }}>Confirm email : </h4>
            </div>
            <div className="col-md">
              <input
                type="email"
                onChange={handleChange}
                name="cemail"
                className="inputboxes"
                value={contact.cemail}
                placeholder="Confirm Email"
              />
            </div>
          </div>
          <div className="row">
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
          <div className="row registration-row">
            <div className="col-md registration-text">
              <h4 style={{ paddingTop: "3%" }}>Phone number : </h4>
            </div>
            <div className="col-md">
              <input
                type="text"
                onChange={handleChange}
                className="inputboxes"
                name="pnum"
                value={contact.pnum}
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>

        <div>
          <br />
          <button
            type="submit"
            className="buttonpurple"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <br />
        {resmes.map((er) => (
          <h4
            style={{
              color: isMessage ? "green" : "#ff1744",
              textAlign: "center",
            }}
          >
            {er} <br />
          </h4>
        ))}
      </form>
    </div>
  );
};

export default FacultyRegister;
