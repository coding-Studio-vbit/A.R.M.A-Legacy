import React from "react";
import logo from "./images/logo.png";
import "../../css/styles.css";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const handleButtonClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  const StudentPortal = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div className="all-items">
      <br />
      <img src={logo} className="landingPageImage" />
      <br />
      <br />
      <h1 style={{ color: "grey", fontSize: "85px" }}> A.R.M.A </h1>
      <div style={{ height: "50px" }}></div>
      <h4 style={{ color: "grey", fontSize: "30px" }}> Make Things Simple.</h4>

      <div style={{ height: "100px" }}></div>
      <div className="justi">
        <button
          className="buttonpurple"
          type="submit"
          onClick={handleButtonClick}
        >
          Enter the portal
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
