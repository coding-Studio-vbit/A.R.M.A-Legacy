import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function Register() {
  const [contact, setContact] = useState({
    fName: "",
    email: "",
    cemail: "",
    pnum: "",
  });
  const [values, setValue] = useState("Select a forum");
  const [mute, setMute] = useState(true);
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
  return (
    <div className="mine" style={{ display: "block" }}>
      <h1>Register Here</h1>
      <br />
      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="fName"
            value={contact.fName}
            className="form-control"
            placeholder="Your Name"
          />
        </div>
        <br />
        <Dropdown>
          <Dropdown.Toggle>{values}</Dropdown.Toggle>
          <Dropdown.Menu>
            {["codingStudio", "stumagz", "IEEE-Vbit", "RoboticsClub"].map(
              (club) => (
                <Dropdown.Item onSelect={() => setValue(club)}>
                  {club}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <div class="form-group">
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
        <button disabled={!isEnabled} className="btn btn-primary">
          Register
        </button>
        <br />
      </form>
    </div>
  );
}

export default Register;
