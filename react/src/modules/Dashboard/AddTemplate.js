import React, { useState } from "react";
import Nav from "./Navi";
import "./css/inputfile.scss";
import "./css/space.css";
import axios from "axios";
const AddTemplate = () => {
  const [file, uploadFile] = useState("");
  const [filename, setfilename] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    uploadFile(e.target.files[0]);
    setfilename(true);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_URL}/uploadTemplate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Nav />
      <div
        style={{
          textAlign: "center",
          paddingTop: 50,
        }}
      >
        <h3 style={{ color: "white" }}>
          upload your personalized letter template
        </h3>
        <br />
        <div className="fexi" style={{ display: "block" }}>
          <input type="file" id="file" onChange={handleChange} />
          <label for="file" class="btn-2">
            upload
          </label>

          <h4>{response}</h4>
        </div>
        <br />
      </div>
    </div>
  );
};
export default AddTemplate;
