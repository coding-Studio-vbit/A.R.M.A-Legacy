import React, { useState,useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";
import "./css/ProfileModal.css";
const PassModal = (props) => {
  const [NewPassword, setNewPassword] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [isMessage, setMessage] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });
  const isEnabled = NewPassword === CPassword;

  return (
    <div className="profileModals" style={{textAlign:"center"}}>
      <Modal
        style={{
          overlay: {
            opacity: "1.0",
            margin: 200,
            backgroundColor: "",
          },
        }}
        isOpen={props.Editingon}
      >
        <form>
          <div className="modal-header">
            <h3 style={{ textDecorationColor: "black" }}></h3>
            <button className="close-modal-btn" type="submit">
              X
            </button>
          </div>
            <input
              type="password"
              id="myInput"
              className="form-input"
              style={{width:"350px"}}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old Password"
            ></input>
            <br />
            <input
              type="password"
              id="myInput"
              className="form-input"
              style={{width:"350px"}}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new Password"
            ></input>
            <br />
            <input
              type="password"
              id="myInput"
              className="form-input"
              style={{width:"350px"}}
              placeholder="Confirm new Password"
            ></input>
            <br />
            <h5
              style={{
                display: !isEnabled ? "inline" : "none",
                color: "#ff1744",
              }}
              id="passwordHelp"
              className="form-text"
            >
              Enter the same password as above
            </h5>
          <div className="modal-footer">
          <button className="btn-cancel" type="reset">
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
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
                      `${process.env.REACT_APP_URL}/changeForumPassword`,
                      { newPassword: NewPassword, oldPassword: OldPassword },
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
export default PassModal;
