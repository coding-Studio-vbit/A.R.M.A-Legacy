import React from "react";
import { Link } from "react-router-dom";

const Links = (props) => {
  let value = props.value;
  return (
    //1 for forum login,  2 for forum registration , 3 for faculty login, 4 for faculty registration
    <div>
      {value !== 1 && (
        <Link
          to={"/login"}
          style={{ display: "block", marginTop: 20, color: "#00e676" }}
        >
          Go to Forum Login Page
        </Link>
      )}
      {value !== 2 && (
        <Link
          to={"/register"}
          style={{ display: "block", marginTop: 20, color: "#00e676" }}
        >
          Go to Forum Registration Page
        </Link>
      )}
      {value !== 3 && (
        <Link
          to={"/facultylogin"}
          style={{ display: "block", marginTop: 20, color: "#00e676" }}
        >
          Go to Faculty Login Page
        </Link>
      )}
      {value !== 4 && (
        <Link
          to={"/facultyregister"}
          style={{ display: "block", marginTop: 20, color: "#00e676" }}
        >
          Go to Faculty Registration Page
        </Link>
      )}
    </div>
  );
};

export default Links;
