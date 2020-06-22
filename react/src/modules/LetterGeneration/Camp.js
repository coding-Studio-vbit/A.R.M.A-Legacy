import React, { useState, Fragment } from "react";
import axios from "axios";
import download from "js-file-download";
import Nav from "../Dashboard/Navi"

const Camp = () => {
  const [inputFields, setInputFields] = useState([{ Name: "", Roll: "" }]);
  const [team_name, setTeamname] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [respects, setRespects] = useState("");
  const [event_name, setEventname] = useState("");
  const [letter_body, setLetterbody] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [start_hour, setStarthour] = useState("");
  const [start_min, setStartmin] = useState("");
  const [start_meridian, setStartmeridian] = useState("");
  const [todate, setTodate] = useState("");
  const [end_hour, setEndhour] = useState("");
  const [end_min, setEndmin] = useState("");
  const [end_meridian, setEndmeridian] = useState("");
  const [where, setWhere] = useState("");

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ Name: "", Roll: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const isSubmit = designation === "" || department === "" || date ==="" || subject === ""|| respects ===""||team_name===""||event_name===""||letter_body===""||fromdate===""||start_hour===""||start_min===""||start_meridian===""||todate===""||end_hour===""||end_min===""||end_meridian===""||where===""||inputFields[0].Name===""||inputFields[0].Roll===""? false:true


  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "Name") {
      values[index].Name = event.target.value;
    } else if (event.target.name === "Roll") {
      values[index].Roll = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      team_name,
      designation,
      department,
      date,
      subject,
      respects,
      event_name,
      letter_body,
      fromdate,
      start_hour,
      start_min,
      start_meridian,
      todate,
      end_hour,
      end_min,
      end_meridian,
      where
    );
  };

  var studentdetails = inputFields;

  const submit = (e) => {
    console.log("inputFields", team_name);

    axios
      .post(
        `${process.env.REACT_APP_URL}/campaigning`,
        {
          designation,
          department,
          date,
          subject,
          respects,
          team_name,
          event_name,
          fromdate,
          todate,
          start_hour,
          start_min,
          start_meridian,
          end_hour,
          end_min,
          end_meridian,
          letter_body,
          studentdetails,
          where,
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
        download(file, "FINAL_CAMPAIGNING.docx");
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
                <form id="txtb" method="POST" action="/campaigning">
                  <h3 style={{ textAlign: "center" }}>
                    Permission for Campaigning Inside/Outside College
                  </h3>
                  <br />
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="designation">
                      Designation:{" "}
                    </span>
                    <select
                      className="form-control"
                      name="designation"
                      onChange={(e) => setDesignation(e.target.value)}
                    >
                    <option value="" disabled selected hidden>
                      Select your option
                    </option>
                    <option value="Head of Department">
                      Head of Department
                    </option>
                    <option value="Director">Director</option>
                  </select>
                  <span className="select-arrow"></span>
                </div>
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="department">
                      Department:{" "}
                    </span>
                    <select
                      className="form-control"
                      name="department"
                      onChange={(e) => setDepartment(e.target.value)}
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
                    <span className="form-label" for="date">
                      {" "}
                      Current Date :{" "}
                    </span>
                    <input
                      className="form-control"
                      name="date"
                      type="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="subject">
                      Subject :
                    </span>
                    <input
                      className="form-control"
                      name="subject"
                      placeholder="Enter Letter Subject"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="respects">
                      Respects :{" "}
                    </span>
                    <select
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
                    <span className="form-label" for="team_name">
                      Forrum/Team name :{" "}
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      name="team_name"
                      placeholder="Enter name"
                      onChange={(e) => setTeamname(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="event_name">
                      Event Name
                    </span>
                    <input
                      className="form-control"
                      name="event_name"
                      placeholder="Enter event name"
                      onChange={(e) => setEventname(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="where">
                      Inside / Outside :{" "}
                    </span>
                    <select
                      className="form-control"
                      name="where"
                      onChange={(e) => setWhere(e.target.value)}
                    >
                    <option value="" disabled selected hidden>
                      Select your option
                    </option>
                    <option value="Inside">Inside</option>
                    <option value="Outside">Outside</option>
                  </select>
                  <span className="select-arrow"></span>
                </div>
                  <span className="form-label">Select Date and Time :</span>
                  <br />
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group">
                        <span className="form-label" for="fromdate">
                          From
                        </span>
                        <input
                          className="form-control"
                          name="fromdate"
                          type="date"
                          required
                          onChange={(e) => setFromdate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <span className="form-label" for="start_hour">
                              Hour
                            </span>
                            <select
                              className="form-control"
                              name="start_hour"
                              onChange={(e) => {
                                e.persist();
                                setStarthour(e.target.value);
                              }}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </select>
                            <span className="select-arrow"></span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <span className="form-label" for="start_min">
                              Min
                            </span>
                            <select
                              className="form-control"
                              name="start_min"
                              onChange={(e) => {
                                e.persist();
                                setStartmin(e.target.value);
                              }}
                            >
                              <option>00</option>
                              <option>05</option>
                              <option>10</option>
                              <option>15</option>
                              <option>20</option>
                              <option>25</option>
                              <option>30</option>
                              <option>35</option>
                              <option>40</option>
                              <option>45</option>
                              <option>50</option>
                              <option>55</option>
                            </select>
                            <span className="select-arrow"></span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <span className="form-label" for="start_meridian">
                              AM/PM
                            </span>
                            <select
                              className="form-control"
                              name="start_meridian"
                              onChange={(e) => {
                                e.persist();
                                setStartmeridian(e.target.value);
                              }}
                            >
                            <option value="" disabled selected hidden>
                              ...
                            </option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                            <span className="select-arrow"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group">
                        <span className="form-label" for="todate">
                          To
                        </span>
                        <input
                          className="form-control"
                          type="date"
                          name="todate"
                          required
                          onChange={(e) => setTodate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <span className="form-label" for="end_hour">
                              Hour
                            </span>
                            <select
                              className="form-control"
                              name="end_hour"
                              onChange={(e) => {
                                e.persist();
                                setEndhour(e.target.value);
                              }}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </select>
                            <span className="select-arrow"></span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <span className="form-label" for="end_min">
                              Min
                            </span>
                            <select
                              className="form-control"
                              name="end_min"
                              onChange={(e) => {
                                e.persist();
                                setEndmin(e.target.value);
                              }}
                            >
                              <option>00</option>
                              <option>05</option>
                              <option>10</option>
                              <option>15</option>
                              <option>20</option>
                              <option>25</option>
                              <option>30</option>
                              <option>35</option>
                              <option>40</option>
                              <option>45</option>
                              <option>50</option>
                              <option>55</option>
                            </select>
                            <span className="select-arrow"></span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <span className="form-label" for="end_meridian">
                              AM/PM
                            </span>
                            <select
                              className="form-control"
                              name="end_meridian"
                              onChange={(e) => {
                                e.persist();
                                setEndmeridian(e.target.value);
                              }}
                            >
                            <option value="" disabled selected hidden>
                              ...
                            </option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                            <span className="select-arrow"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    <span className="form-label" for="letter_body">
                      About your event body :{" "}
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      name="letter_body"
                      onChange={(e) => setLetterbody(e.target.value)}
                      placeholder="Enter about Event"
                    />
                  </div>
                  <br />
                  <span className="form-label">Team Details:</span>
                  <br />
                  {inputFields.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`}>
                      <div className="form-group">
                        <div class="row">
                          <div class="col-sm-5">
                            <input
                              className="form-control"
                              type="text"
                              id="Name"
                              name="Name"
                              value={inputField.firstName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder={`Name`}
                            />
                          </div>
                          <div class="col-sm-5">
                            <input
                              className="form-control"
                              type="text"
                              id="Roll"
                              name="Roll"
                              value={inputField.firstName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder={`Roll No`}
                            />
                          </div>
                          <div class="col align-self-center">
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={() => handleRemoveFields(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => handleAddFields()}
                  >
                    Add
                  </button>
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

export default Camp;
