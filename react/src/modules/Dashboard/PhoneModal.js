import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./css/ProfileModal.css";
const PhoneModal = (props) => {
  const [NewPhone, setNewPhone] = useState("");

  return (
    <div>
      <Modal
        style={{
          overlay: {
            opacity: "1.0",
            margin: 200,
            backgroundColor: "",
          },
          content: {
            backgroundColor: "#181A1B",
            height: "270px",
            width: "500px",
            position: "absolute",
            left: "35%",
            top: "50%",
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
              type="phone"
              id="myInput"
              className="form-input"
              style={{width:"350px"}}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Enter new Phone number"
            ></input>
            <br />
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
                      `${process.env.REACT_APP_URL}/changeForumPhone`,
                      { newPhone: NewPhone},
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
export default PhoneModal;
