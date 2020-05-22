import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

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
      setTimeout(() => setError(""), 5000);
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
      .then((res) => {
        if (res.data.hasOwnProperty("err")) {
          setError(res.data.err);
        } else if (res.data.hasOwnProperty("message")) {
          setError(res.data.message);
          setMessage(true);
        }
      })
      .catch((err) => console.log(err));
  };
  //
  const deptList = ["CSE", "IT", "EEE", "ECE", "MECH", "CIVIL", "MBA"];
  return (
    <div className="all-items">
      <div className="forms">
        <form>
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
          <h1 style={{ color: "white" }}>A.R.M.A Faculty Registration</h1>
          <br />
          <div class="form-group">
            <span className="form-label" htmlFor="rollNo">
              RollNo:{" "}
            </span>
            <input
              type="text"
              onChange={handleChange}
              name="rollNo"
              className="form-control"
              value={contact.rollNo}
              placeholder="Roll Number"
            />

            <span className="form-label" htmlFor="rollNo">
              Name:{" "}
            </span>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              className="form-control"
              value={contact.name}
              placeholder="Name"
            />
            <br />
            <div className="form-group">
              <span className="form-label" htmlFor="department">
                Department:{" "}
              </span>
              <select
                className="form-control"
                name="value"
                onChange={(e) => setDept(e.target.value)}
              >
                {deptList.map((depts) => (
                  <option> {depts} </option>
                ))}
              </select>

              <span className="select-arrow"></span>
            </div>
            <span className="form-label" htmlFor="rollNo">
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
          <div class="form-group">
            <span className="form-label" htmlFor="rollNo">
              confirm Email:{" "}
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
              class="form-text"
            >
              Enter the same email as above
            </h5>
          </div>
          <div class="form-group">
            <span className="form-label" htmlFor="rollNo">
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
          <button type="submit" className="submit-btn" onClick={handleRegister}>
            Register
          </button>
          <br />
          <Link
            to={"/facultylogin"}
            style={{ display: "block", marginTop: 20, color: "#00e676" }}
          >
            Go to Login Page
          </Link>
          <br />
          <h4 style={{ color: isMessage ? "green" : "#ff1744" }}>{error} </h4>
        </form>
      </div>
    </div>
  );
};

export default FacultyRegister;
