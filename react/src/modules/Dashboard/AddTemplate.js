import React, { useState, useEffect } from "react";
import Nav from "./Navi";
import "./css/inputfile.scss";
import "../../css/styles.css";
import sampletemplate from "./images/sampletemplate.png";
import placeholderstable from "./images/placeholderstable.png";
import attendanceplaceholders from "./images/attendanceplaceholders.png";
import axios from "axios";
const AddTemplate = () => {
  const [file, uploadFile] = useState("");
  const [filename, setfilename] = useState(false);
  const [response, setResponse] = useState("");
  const placeholders = "placeholders";
  const handleSubmit = (e) => {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    axios
      .post(`${process.env.REACT_APP_URL}/uploadTemplate`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        setResponse(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    uploadFile(e.target.files[0]);
    setfilename(true);
    setfilename(true);
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
        <div>
          <input type="file" id="file" onChange={handleChange} />
          <label for="file" className="btn-2">
            upload
          </label>
        </div>

        {filename && (
          <h4 style={{ color: "white", textAlign: "center" }}>File Uploaded</h4>
        )}
        <br />
        <button type="submit" className="buttonpurple" onClick={handleSubmit}>
          Submit
        </button>
        <h4 style={{ color: "white" }}>{response}</h4>

        <br />
      </div>
      <div>
        <h1 className="title" style={{ textAlign: "center" }}>
          HOW DO YOU UPLOAD A LETTER TEMPLATE?
        </h1>
        <p className="subtitle1"> WHY ADD YOUR OWN LETTER TEMPLATES? </p>
        <p className="text1">
          A personalized Letter Generator simplifies the generation of required
          letters based on your own specific formatting and allows you to reuse
          the same letter template. All you have to do is create a letter
          template in a DOCX format consisting of all of your required
          placeholders and upload your template.
        </p>
        <p className="text2">
          Placeholders are the varying values in your letters like date,
          subject, team name(forum name) etc. They are usually enclosed in {}.
          The values for the placeholders will be inputted from a form based on
          the inputs given by the user, these values will then replace your{" "}
          {placeholders} and your letter will be generated.
        </p>
        <p className="subtitle2">
          <b>HOW DO YOU CREATE A LETTER TEMPLATE CONSISTING OF PLACEHOLDERS?</b>
        </p>
        <div className="all-items">
          <img
            className="imagud"
            src={sampletemplate}
            style={{ height: "450px", width: "700px" }}
          />
        </div>
        <p className="text3">
          {" "}
          Open up a new document, the content in the document will be according
          to your documenting pattern. Only the varying values will be in{" "}
          {placeholders} format. These {placeholders} can be placed anywhere in
          your document.
        </p>
        <p className="subtitle3">
          <b>WHAT PLACEHOLDERS CAN I USE?</b>
        </p>
        <p className="text4">
          <b>
            NOTE THAT YOU WILL HAVE TO ONLY USE THE PLACEHOLDERS MENTIONED IN
            THIS DOCUMENTATION OR ELSE YOUR TEMPLATE WILL NOT BE VALID AND
            CANNOT BE USED.
          </b>
        </p>
        <p className="text5">
          Also, it is NOT necessary for all these placeholders to be used in
          your letter.
        </p>
        <div className="all-items">
          <img
            className="imagud"
            src={placeholderstable}
            style={{ width: "500px", height: "450px" }}
          />
        </div>
        <p className="text6">
          <b>
            The Attendance table details placeholders are used only once to
            create a table and need not be used for each student.
          </b>
        </p>
        <div className="all-items">
          <img
            className="imagud"
            src={attendanceplaceholders}
            style={{ width: "502px", height: "112px" }}
          />
        </div>
        <p className="text7">
          Once your letter template looks similar to the above example, go ahead
          and upload your template.
        </p>
      </div>
    </div>
  );
};
export default AddTemplate;
