import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../css/styles.css";
const ProfileModal = (props) => {
  const [Email, setEmail] = useState("");
  const [Cemail, setCemail] = useState("");
  const [isMessage, setMessage] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });
  const isEnabled = Email === Cemail;

  return (
    <div>
      <Modal
        style={{
          overlay: {
            opacity: "1.0",
            margin:300,
            position:"absolute",
            backgroundColor: "",
          },
          content: {
            backgroundColor: "#181A1B",
            height: "300px",
            width: "450px",
            position: "absolute",
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-30%',
            left: "20%",
            top: "50%",
          },
        }}
        isOpen={props.Editingon}
      >
        <form >
          <div className="modal-header">
            <h3 style={{ color: "grey" }}></h3>
            <button className="close-modal-btn" type="submit">
              X
            </button>
          </div>
          <div className="modal-content" style={{height:"150px"}}>
            <input
              type="email"
              id="myInput"
              className="form-inputs"
              style={{width:"300px"}}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
            ></input>
            <br />
            <input
              type="email"
              id="myInput"
              className="form-inputs"
              style={{width:"300px"}}
              onChange={(e) => setCemail(e.target.value)}
              placeholder="Confirm new email"
            ></input>
            <br/>
            <h5
              style={{
                display: !isEnabled ? "inline" : "none",
                color: "#ff1744",
              }}
              id="emailHelp"
              className="form-word">
              Enter the same email as above
            </h5>
          </div>
          <div className="modal-footer">
          <button className="btn-cancel" type="reset">
              Clear
            </button>
            <button
              type="submit"
              className="save-button"
              disabled = {!isEnabled}
              onClick={() => {
                let user = JSON.parse(localStorage.getItem("user"));
                if (user !== null) {
                  let userName = user.userName;
                  let accessToken = user.accessToken;
                  console.log(accessToken);
                  let config = {
                    headers: {
                      Authorization: "Bearer " + accessToken,
                    },
                  };
                  console.log(config);
                  axios
                    .post(
                      `${process.env.REACT_APP_URL}/changeForumEmail`,
                      { newEmail: Email },
                      config
                    )
                    .then((response) => {
                      var res = response.data;
                      this.setState({ loginValue: response.data.userType });
                      console.log(res.userType);
                    })

                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ProfileModal;
