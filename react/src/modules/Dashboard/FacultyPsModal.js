import React, { useState,useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../css/styles.css";
const FacultyPsModal = (props) => {
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
    <div>
      <Modal
        style={{
          overlay: {
            opacity: "1.0",
            margin: 300,
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
            <h3 style={{ textDecorationColor: "black" }}></h3>
            <button className="close-modal-btn" type="submit">
              X
            </button>
          </div>
            <input
              type="password"
              id="myInput"
              className="form-inputs"
              style={{width:"350px"}}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old Password"
            ></input>
            <br />
            <input
              type="password"
              id="myInput"
              className="form-inputs"
              style={{width:"350px"}}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new Password"
            ></input>
            <br />
            <input
              type="password"
              id="myInput"
              className="form-inputs"
              style={{width:"350px"}}
              onChange={(e) => setCPassword(e.target.value)}
              placeholder="Confirm new Password"
            ></input>
            <br />
            <h5
              style={{
                display: !isEnabled ? "inline" : "none",
                color: "#ff1744",
              }}
              id="passwordHelp"
              className="form-word"
            >
              Enter the same password as above
            </h5>
          <div className="modal-footer">
          <button className="btn-cancel" type="reset">
              Cancel
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
                      `${process.env.REACT_APP_URL}/changeFacultyPassword`,
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
export default FacultyPsModal;
