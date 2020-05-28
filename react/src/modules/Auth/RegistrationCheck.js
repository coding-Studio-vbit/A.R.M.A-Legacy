import React from "react";
import axios from "axios";

const RegistrationCheck = (props) => {
  let value = props.value;
  const checkRegistrationStatus = () => {
    let un = value;
    if (un !== "Select a forum") {
      axios
        .post("/checkRegistrationStatus", {
          query: {
            username: un,
          },
        })
        .then((res) => {
          if (res.data.message) {
            props.changeRegiValue(true);
          } else {
            props.changeRegiValue(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return <div>{checkRegistrationStatus()}</div>;
};

export default RegistrationCheck;
