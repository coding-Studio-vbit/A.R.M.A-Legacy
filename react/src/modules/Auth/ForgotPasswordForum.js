import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./css/Form.css";
import "./css/Modal.css";

const ForgotPasswordForum = (props) => {
  const [ForumList, updateForumList] = useState([]);
  const [values, setValue] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/getRegisteredForums`)
      .then((res) => {
        let ResForums = res.data;
        updateForumList(ResForums);
        setValue(ResForums[0].actual_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (response !== "") {
      setTimeout(() => setResponse(""), 3000);
    }
  });
  const ForumChangeHandler = (e) => {
    let theForum = e.target.value.toUpperCase();
    setValue(theForum);
  };
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
        username: values.toUpperCase(),
        reg_email: value,
      })
      .then((res) => {
        console.log(res);
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
          <div className="col modal-text"><h4 style={{ paddingTop:"3%" }}>Forum List : </h4></div>
          <div className="col"><select
            className="login-dropdown round"
            style={{margin:0}}
            name="value"
            onChange={(e) => ForumChangeHandler(e)}
          >
            {ForumList.map((club) => (<option> {club.actual_name} </option>))}
          </select></div>
        </div>
        <br/>
        <div className="row forgotmodal-row">
          <div className="col modal-text"><h4 style={{ paddingTop:"3%" }}>Registered email : </h4></div>
          <div className="col"><input
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

export default ForgotPasswordForum;
