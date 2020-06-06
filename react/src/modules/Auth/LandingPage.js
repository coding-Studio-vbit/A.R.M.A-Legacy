import React from "react";
import logo from "./images/logo.png";
import "./css/Form.css";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const handleButtonClick = (e) => {
    e.preventDefault();
    history.push("/login");
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

      <div style={{ height: "150px" }}></div>
      <button className="buttonpurple" onClick={handleButtonClick}>
        Start
      </button>
    </div>
  );
};

export default LandingPage;
