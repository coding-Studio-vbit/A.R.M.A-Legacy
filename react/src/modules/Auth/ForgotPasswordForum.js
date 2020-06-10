import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./css/Form.css";

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
      <div style={{ padding: 60 }}>
        <div className="form-group justi">
          <h4 style={{ paddingLeft: 20 }}>Forum List: </h4>
          <select
            className="selecti round"
            name="value"
            onChange={(e) => ForumChangeHandler(e)}
          >
            {ForumList.map((club) => (
              <option> {club.actual_name} </option>
            ))}
          </select>
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
        <h3 style={{ color: { error } ? "green" : "red", textAlign: "center" }}>
          {response}
        </h3>
      </div>
    </Modal>
  );
};

export default ForgotPasswordForum;
