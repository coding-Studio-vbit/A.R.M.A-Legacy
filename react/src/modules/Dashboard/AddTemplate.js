import React from "react";
import Nav from "./Navi";
import "./css/template.css";
const AddTemplate = () => {
  return (
    <div>
      <Nav />
      <div
        style={{
          textAlign: "center",
          paddingTop: 50,
        }}
      >
        <div style={{ backgroundcolor: "white" }}>
          <input
            type="file"
            style={{
              color: "black",
              backgroundColor: "white",
              padding: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AddTemplate;
