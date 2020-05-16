import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const FacultyRegister = () => {
  const [dept, setDept] = useState("CSE");
  const [contact, setContact] = useState({
    rollNo: "",
    name: "",
    email: "",
    cemail: "",
    pnum: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  const isEnabled = contact.email === contact.cemail;
  const isPhone = contact.pnum.length === 10;
  const disable = isEnabled && isPhone;
  const handleRegister = () => {
    //console.log({ values }, contact.email, contact.pnum);
    axios
      .post("/registerFaculty", {
        registrationData: {
          faculty_name: contact.name,
          faculty_dept: dept,
          faculty_roll: contact.rollNo,
          faculty_email: contact.email,
          faculty_phone: contact.pnum,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  //
  const deptList = ["CSE", "IT", "EEE", "ECE", "MECH", "CIVIL", "MBA"];
  return (
    <div className="mine" style={{ display: "block" }}>
      <img src={logo} alt="logo" style={{ width: "150px", height: "150px" }} />
      <h1>A.R.M.A Faculty Registration</h1>
      <br />
      <form>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            name="rollNo"
            className="form-control"
            value={contact.rollNo}
            placeholder="Roll Number"
          />
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            className="form-control"
            value={contact.name}
            placeholder="Name"
          />
          <br />
          <Dropdown>
            <Dropdown.Toggle>{dept}</Dropdown.Toggle>
            <Dropdown.Menu>
              {deptList.map((depts) => (
                <Dropdown.Item onSelect={() => setDept(depts)}>
                  {depts}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            className="form-control"
            value={contact.email}
            placeholder="Email"
          />
        </div>
        <div class="form-group">
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
            class="form-text"
          >
            Enter the same email as above
          </h5>
        </div>
        <br />
        <div class="form-group">
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
          disabled={!disable}
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
    </div>
  );
};

export default FacultyRegister;
