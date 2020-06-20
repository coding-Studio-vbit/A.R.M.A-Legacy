import React, { useState, Fragment, useEffect } from "react";
import Nav from "../Dashboard/Navi";
import axios from "axios";
import "./css/Request.css";
import "react-bootstrap";
import { useHistory } from "react-router-dom";
import MultiSelect from "react-multi-select-component";

const EditCreateRequest = (props) => {
  const [Req_data, setReq_data] = useState({});
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    // console.log(props.location.Rprops.id)
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        request_id: props.location.req_id,
      },
    };
    axios
      .get(`${process.env.REACT_APP_URL}/getrequest`, config)
      .then((res) => {
        var data = res.data[0];
        setReq_data(data.request_data);
        setDescription(data.request_data.description);
        setSubject(data.request_data.subject);
        setFacilities(data.request_data.facilities);
        setInputFields(data.request_data.participants);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [inputFields, setInputFields] = useState([
    { name: "", roll: "", dept: "", year: "", check: false },
  ]);

  const [subject, setSubject] = useState("");
  const [Faculty, setFaculty] = useState([]);
  const [Facilities, setFacilities] = useState([]);
  const [description, setDescription] = useState("");
  console.log(description);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name: "", roll: "", dept: "", year: "", check: false });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "roll") {
      values[index].roll = event.target.value;
    } else if (event.target.name === "department") {
      values[index].dept = event.target.value;
    } else if (event.target.name === "year") {
      values[index].year = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  var requestdetails = inputFields;

  const submit = (e) => {};

  //Add Update
  const history = useHistory();
  const update = (e) => {
    Req_data.description = description;
    Req_data.subject = subject;
    Req_data.participants = inputFields;
    Req_data.facilities = Facilities;
    let user = JSON.parse(localStorage.getItem("user"));
    let accessToken = user.accessToken;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_URL}/createrequest`,
        {
          request_id: props.location.req_id,
          request_data: Req_data,
        },
        config
      )
      .then((result) => {
        console.log(result);
        history.push("/dashboard");
      });
  };

  //Add Delete

  const remove = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      let userName = user.userName;
      let accessToken = user.accessToken;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          request_id: props.location.req_id,
        },
      };
      console.log(config);
      axios
        .delete(`${process.env.REACT_APP_URL}/createrequest`, config)
        .then((response) => {
          console.log("Deleted");
          history.push("/dashboard");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Facultyoptions = [];

  const Facilitiesoptions = [];
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    // console.log(props.location.Rprops.id)
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        request_id: JSON.parse(localStorage.getItem("req_id")),
      },
    };
    console.log(config);
    axios
      .get(`${process.env.REACT_APP_URL}/getFaculty`, config)
      .then((res) => {
        var data = res.data;
        var all_faculty = data.all_faculty;
        all_faculty.forEach((fac) => {
          Facultyoptions.push({
            value: fac,
            label: fac,
          });
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_URL}/getFacilities`, config)
      .then((res) => {
        var data = res.data;
        var all_facilities = data.all_facilities;
        all_facilities.forEach((fci) => {
          Facilitiesoptions.push({
            value: fci,
            label: fci,
            facility: fci,
            check: true,
          });
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <React.Fragment>
      <Nav />
      <form onSubmit={handleSubmit}>
        <div className="boxbg">
          <div className="container-fluid">
            <div className="row">
              <div className="col self-align-start">
                <h3> Edit Request </h3>
              </div>
            </div>
            <hr className="line" />
            <br />
            <div className="row">
              <div className="col self-align-start">
                <h5>Select Request Type :</h5>
              </div>
              <div className="col self-align-end">
                <select
                  required
                  className="form-control"
                  name="department"
                  onChange={(e) => {
                    e.persist();
                    setSubject(e.target.value);
                  }}
                >
                  <option value={subject} disabled selected hidden>
                    {subject}
                  </option>
                  <option value="Attendance for Participants">
                    Attendance for Participants
                  </option>
                  <option value="Attendance for Team">
                    Attendance for Team
                  </option>
                  <option value="Campaigning">Campaigning</option>
                  <option value="Conduct Event">Conduct Event</option>
                  <option value="Event Venue">Event Venue</option>
                </select>
                <span className="select-arrow"></span>
              </div>
            </div>
            <br />
            <hr className="linew" />
            <br />
            <div className="row">
              <div className="col">
                <h5>Description :</h5>
              </div>
              <div className="col">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Enter Details about your event"
                    value={description}
                    rows="3"
                    onChange={(e) => {
                      e.persist();
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <br />
            <hr className="linew" />
            <br />
            <div className="row">
              <div className="col">
                <h5>People Involved :</h5>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="row">
                    <div class="col-sm-2 align-self-center">
                      <h6>Name</h6>
                    </div>
                    <div class="col-sm-2 align-self-center">
                      <h6>Roll.No</h6>
                    </div>
                    <div class="col-sm-2 align-self-center">
                      <h6>Dept</h6>
                    </div>
                    <div class="col-sm-2 align-self-center">
                      <h6>Year</h6>
                    </div>
                    <div class="col align-self-center">
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => handleAddFields()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <br />
                  {inputFields.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`}>
                      <div className="form-group">
                        <div class="row">
                          <div class="col-sm-2">
                            <input
                              className="form-control"
                              type="text"
                              id="Name"
                              name="name"
                              value={inputField.name}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder={inputField.name}
                            />
                          </div>
                          <div class="col-sm-2">
                            <input
                              className="form-control"
                              type="text"
                              id="Roll"
                              name="roll"
                              value={inputField.roll}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder={inputField.roll}
                            />
                          </div>
                          <div class="col-sm-2">
                            <select
                              required
                              className="form-control"
                              name="department"
                              value={inputField.firstName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            >
                              <option
                                value={inputField.dept}
                                disabled
                                selected
                                hidden
                              >
                                {inputField.dept}
                              </option>
                              <option value="CSE">CSE</option>
                              <option value="IT">IT</option>
                              <option value="ECE">ECE</option>
                              <option value="EEE">EEE</option>
                              <option value="CIVIL">CIVIL</option>
                              <option value="MECH">MECH</option>
                            </select>
                          </div>
                          <div class="col-sm-2">
                            <select
                              required
                              className="form-control"
                              name="year"
                              value={inputField.year}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            >
                              <option
                                value={inputFields.year}
                                disabled
                                selected
                                hidden
                              >
                                {inputFields.year}
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
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
                </div>
              </div>
            </div>
            <br />
            <hr className="linew" />
            <br />
            <div className="row">
              <div className="col">
                <h5>Facilities Required :</h5>
              </div>
              <div className="col">
                <MultiSelect
                  options={Facilitiesoptions}
                  value={Facilities}
                  onChange={setFacilities}
                  labelledBy={"Select Your Option"}
                  className="Multiselect"
                />
              </div>
            </div>
            <br />
            <hr className="linew" />
            <br />
            <div className="row" style={{ textAlign: "center" }}>
              <div className="col align-self-center">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={() => update()}
                >
                  Update Request
                </button>
              </div>
              <div className="col align-self-center">
                <button type="submit" class="btn btn-danger" onClick={remove}>
                  Delete Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditCreateRequest;
