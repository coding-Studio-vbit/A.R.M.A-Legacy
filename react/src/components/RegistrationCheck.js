import React, { useState } from "react";
import axios from "axios";

const RegistrationCheck = (props) => {
  let value = props.value;
  const isForumSelected = value !== "Select a forum";
  const [RegistrationStatus, setRegistrationStatus] = useState(2);
  //initially it is set to 2, when true set to 1 , when false set to 0
  const checkRegistrationStatus = () => {
    let un = value;
    axios
      .post("/checkRegistrationStatus", {
        query: {
          username: un,
        },
      })
      .then((res) => {
        if (res.data.message) {
          setRegistrationStatus(1);
        } else {
          setRegistrationStatus(0);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button
        disabled={!isForumSelected}
        type="button"
        className="btn btn-link"
        onClick={checkRegistrationStatus}
      >
        Check Regististration Status{" "}
      </button>
      {!isForumSelected && (
        <small class="form-text text-muted">
          (Select your forum to check registration status)
        </small>
      )}
      {RegistrationStatus === 1 && (
        <h3 style={{ color: "green" }}>Forum is registered</h3>
      )}
      {RegistrationStatus === 0 && (
        <h3 style={{ color: "red" }}>Forum is not registered</h3>
      )}
    </div>
  );
};

export default RegistrationCheck;
