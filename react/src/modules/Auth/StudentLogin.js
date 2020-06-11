import React from "react";
import { useHistory } from "react-router-dom";
import "./css/Form.css";
const StudentLogin = () => {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/tlist");
  };
  return (
    <div className="all-items">
      <div className="sforms">
        <form>
          <h1 style={{ color: "white" }}> Student Portal</h1>

          <br />

          <button
            className="buttonpurple"
            type="submit"
            onClick={() => history.push("/tlist")}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
