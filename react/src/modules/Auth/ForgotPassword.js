import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./css/Form.css";

const ForgotPassword = (props) => {
  const [value, changeValue] = useState("");
  const [response, setResponse] = useState("");
  const [error, isError] = useState(false);
  const forgot = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/forgotPassword`, {})
      .then((res) => {
        if (!res.hasOwnProperty("err")) {
          setResponse(res.message);
          isError(false);
        } else {
          setResponse(res.err);
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
        <button type="submit" onChange={forgot} className="buttonpurple">
          Submit
        </button>
        <br />
        <h3 style={{ color: isError ? "red" : "green", textAlign: "center" }}>
          {response}
        </h3>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
