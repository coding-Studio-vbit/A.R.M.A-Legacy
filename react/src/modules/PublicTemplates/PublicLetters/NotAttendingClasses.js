import React, { useState, Fragment } from "react";
import axios from "axios";
import download from "js-file-download";
import Nav from "../Navi";
const NAC = () => {
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [respects, setRespects] = useState("");
  const [your_name, setName] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [roll_no, setRollNo] = useState("");
  const [reason, setReason] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [hod_name, setHODname] = useState("");
  const [faculty_name, setFacultyName] = useState("");
  const [faculty, setFaculty] = useState("");
    const isSubmit = department === "" || date ==="" || subject === ""|| respects ===""||your_name===""||year===""||section===""||roll_no===""||reason===""||start_date===""||end_date===""||hod_name===""||faculty_name===""||faculty===""? false:true
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      department,
      date,
      subject,
      respects,
      your_name,
      year,
      section,
      roll_no,
      reason,
      start_date,
      end_date,
      hod_name,
      faculty_name,
      faculty
    );
  };


  const submit = (e) => {

    axios
      .post(
        `${process.env.REACT_APP_URL}/aknowledgeabsence`,
        {
            department,
            date,
            subject,
            respects,
            your_name,
            year,
            section,
            roll_no,
            reason,
            start_date,
            end_date,
            hod_name,
            faculty_name,
            faculty
        },
        { responseType: "arraybuffer" }
      )
      .then((result) => {
        console.log(result);
        //download(result.data, 'Team_Attendance_Permission.docx');
        const file = new Blob([result.data], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        download(file, "NOT_ATTENDING_CLASSES.docx");
      });
  };

  return (
    <div>
    <Nav/>
    <form onSubmit={handleSubmit}>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="booking-form">
                <form id="txtb" method="POST" action="/leaveletter">
                  <h3 style={{ textAlign: "center" }}>
                    Acknowledge Absence Permission
                  </h3>
                  <br />
                  <br />
                  <div className="form-group">
                    <span className="form-label" htmlFor="department">
                      Department:{" "}
                    </span>
                    <select
                      required
                      className="form-control"
                      name="department"
                      onChange={(e) => {
                        e.persist();
                        setDepartment(e.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select your option
                      </option>
                      <option value="Department of Computer Science and Engineering">
                        Department of Computer Science and Engineering
                      </option>
                      <option value="Department of Information Technology">
                        Department of Information Technology
                      </option>
                      <option value="Department of Electrical and Electronics Engineering">
                        Department of Electrical and Electronics Engineering
                      </option>
                      <option value="Department of Electronics and Communication Engineering">
                        Department of Electronics and Communication Engineering
                      </option>
                      <option value="Department of Civil Engineering">
                        Department of Civil Engineering
                      </option>
                      <option value="Department of Mechanical Engineering">
                        Department of Mechanical Engineering
                      </option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="date">
                      Date:{" "}
                    </span>
                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="subject">
                      Subject:{" "}
                    </span>
                    <input
                      required
                      className="form-control"
                      type="text"
                      name="subject"
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject "
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="respects">
                      Respects:{" "}
                    </span>
                    <select
                      required
                      className="form-control"
                      name="respects"
                      onChange={(e) => setRespects(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Select your option
                      </option>
                      <option value="Sir">Sir</option>
                      <option value="Ma'am">Ma'am</option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="team_name">
                      Your Name :{" "}
                    </span>
                    <input
                      required
                      className="form-control"
                      type="text"
                      name="team_name"
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="Year">
                      Year:{" "}
                    </span>
                    <select
                      required
                      className="form-control"
                      name="Year"
                      onChange={(e) => {
                        e.persist();
                        setYear(e.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select your option
                      </option>
                      <option value="First">
                        First
                      </option>
                      <option value="Second">
                        Second
                      </option>
                      <option value="Third">
                        Third
                      </option>
                      <option value="Forth">
                        Forth
                      </option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="Section">
                      Section:{" "}
                    </span>
                    <select
                      required
                      className="form-control"
                      name="Section"
                      onChange={(e) => {
                        e.persist();
                        setSection(e.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select your option
                      </option>
                      <option value="A">
                        A
                      </option>
                      <option value="B">
                        B
                      </option>
                      <option value="C">
                        C
                      </option>
                      <option value="D">
                        D
                      </option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="roll_no">
                      Roll No :{" "}
                    </span>
                    <input
                      required
                      className="form-control"
                      type="text"
                      name="roll_no"
                      placeholder="Enter Roll.No"
                      onChange={(e) => setRollNo(e.target.value)}
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="reason">
                      Describe your Reason :{" "}
                    </span>
                    <input
                      required
                      className="form-control"
                      type="text"
                      name="reason"
                      placeholder="Enter Reason"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  <br />

                  <span className="form-label">Select Date :</span>
                  <br />
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group">
                        <span className="form-label" htmlFor="start_date">
                          From
                        </span>
                        <input
                          className="form-control"
                          name="fromdate"
                          type="date"
                          required
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-5">
                      <div className="form-group">
                        <span className="form-label" htmlFor="end_date">
                          To
                        </span>
                        <input
                          className="form-control"
                          name="fromdate"
                          type="date"
                          required
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="hod_name">
                      HOD name:{" "}
                    </span>
                    <input
                      required
                      className="form-control"
                      type="text"
                      name="hod_name"
                      placeholder="Enter HOD name"
                      onChange={(e) => setHODname(e.target.value)}
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="Faculty_name">
                      Faculty Name:{" "}
                    </span>
                    <input
                      required
                      className="form-control"
                      type="text"
                      name="Faculty_name"
                      placeholder="Enter Faculty name"
                      onChange={(e) => setFacultyName(e.target.value)}
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <span className="form-label" htmlFor="faculty">
                      Select Faculty:{" "}
                    </span>
                    <select
                      required
                      className="form-control"
                      name="department"
                      onChange={(e) => {
                        e.persist();
                        setFaculty(e.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select your option
                      </option>
                      <option value="CSE">
                        CSE
                      </option>
                      <option value="IT">
                        IT
                      </option>
                      <option value="ECE">
                        ECE
                      </option>
                      <option value="EEE">
                        EEE
                      </option>
                      <option value="CIVIL">
                        CIVIL
                      </option>
                      <option value="MECH">
                        MECH
                        </option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>

                  <br />
                  <br />
                  <div className="form-btn">
                    <button
                      className="submit-btn"
                      type="submit"
                      onClick={() => submit()}
                      disabled = {!isSubmit}
                    >
                      Generate Letter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};

export default NAC;
