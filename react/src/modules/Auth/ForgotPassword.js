import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./css/Form.css";

const ForgotPassword = (props) => {
  const [value, changeValue] = useState("");
  const [response, setResponse] = useState("");
  const [username, changeUser] = useState("");
  const [error, isError] = useState(false);
  const forgot = (e) => {
    console.log(props.userType);
    e.preventDefault();
    let userType = props.userType;
    axios
      .post(`${process.env.REACT_APP_URL}/forgotPassword`, {
        userType: userType,
        username: username,
        reg_email: value,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.hasOwnProperty("message")) {
          setResponse(res.data.message);
          isError(false);
          changeUser("");
          changeValue("");
        } else {
          setResponse(res.data.err);
          isError(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{ padding: 60 }}>
        <div className="justi">
          <h3>User Name</h3>
          <br />
          <br />

          <input
            type="text"
            placeholder="User Name"
            className="inputboxes"
            onChange={(e) => changeUser(e.target.value)}
          />
        </div>
        <br />
        <br />

        <div className="justi">
          <h3>Registered Email</h3>
          <br />
          <br />
          <input
            type="email"
            placeholder="email address"
            className="inputboxes"
            onChange={(e) => changeValue(e.target.value)}
          />
        </div>
        <br />
        <div className="justi">
          <button type="submit" onClick={forgot} className="buttonpurple">
            Submit
          </button>
          <br />
        </div>
        <h3 style={{ color: { error } ? "red" : "green", textAlign: "center" }}>
          {response}
        </h3>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
