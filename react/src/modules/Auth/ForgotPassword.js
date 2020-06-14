import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./css/Form.css";
import "./css/Modal.css";

const ForgotPassword = (props) => {
  useEffect(() => {
    if (response !== "") {
      setTimeout(() => setResponse(""), 3000);
    }
  });
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
      <div className="container modal-bg">
        <div className="form-group row forgotmodal-row">
          <div className="col-md modal-text"><h4 style={{paddingTop:"3%" }}>Roll number : </h4></div>
          <div className="col-md"><input
            type="text"
            placeholder="User Name"
            className="inputboxes"
            onChange={(e) => changeUser(e.target.value)}
          /></div>
        </div>
        <br/>
        <div className="row forgotmodal-row">
          <div className="col-md modal-text"><h4 style={{paddingTop:"3%" }}>Registered email: </h4></div>
          <div className="col-md"><input
            type="email"
            placeholder="email address"
            className="inputboxes"
            onChange={(e) => changeValue(e.target.value)}
          /></div>
        </div>
        <br/>
        <br/>
        <div className="row forgotmodal-row">
          <button type="submit" onClick={forgot} className="buttonpurple">
            Submit
          </button>
        </div>
        <h3 style={{ color: { error } ? "green" : "red", textAlign: "center" }}>
          {response}
        </h3>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
