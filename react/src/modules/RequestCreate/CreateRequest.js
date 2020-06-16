import React, { useState, Fragment, useEffect } from "react";
import Nav from "../Dashboard/Navi";
import axios from "axios";
import "./css/Request.css";
import "react-bootstrap";
import MultiSelect from "react-multi-select-component";
import { useHistory } from "react-router-dom";
// const accessToken = JSON.parse(localStorage.getItem('user')).accessToken

const CreateRequest = () => {

  //faculty endpoint is /getFaculty
  //facility endpoint is /getFacilities
  //getFaculty respose is all_faculty which is an array
  //getFacility respose is all_facility which is an array

  const [inputFields, setInputFields] = useState([
    { name: "", roll: "", Dept: "", Year: "", check: false },
  ]);

  const history = useHistory();
  const [request, setRequest] = useState("");
  const [Faculty, setFaculty] = useState([]);
  const [Facilities, setFacilities] = useState([]);
  const [description, setDescription] = useState("");
  const [addfacilities, setCustreq] = useState("");

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name: "", roll: "", Dept: "", Year: "", check: false });
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
    } else if (event.target.name === "Dept") {
      values[index].Dept = event.target.value;
    } else if (event.target.name === "Year") {
      values[index].Year = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (
    e,
    request,
    Faculty,
    description,
    Facilities,
    addfacilities
  ) => {
    e.preventDefault();
    console.log(request, Faculty, description, Facilities, addfacilities);
  };

  var requestdetails = inputFields;

  const submit = (e) => {
    var arr = [];
    Faculty.forEach((item) => {
      arr.push(item.value);
    });
    console.log(arr);
    var arr1 = [];
    Facilities.forEach((item) => {
      arr1.push(item);
    });
    console.log(arr1);
    console.log(requestdetails);
    var accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

    axios
      .post(
        `${process.env.REACT_APP_URL}/createrequest`,
        {
          request_data: {
            subject: request,
            description: description,
            facilities: arr1,
            participants: requestdetails,
            selected_facilities: [{ facility: "No Facility Yet", check: true }],
            selected_participants: [
              { name: "No Name Yet", roll: "No Roll Number Yet", check: true },
            ],
          },
          recipients: arr,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(function (response) {
        console.log("helloo");
        alert("Request made");
        history.push("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
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
        var all_faculty = data.all_faculty
        all_faculty.forEach(fac => {Facultyoptions.push({
          value: fac, label: fac
        })})
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
    .get(`${process.env.REACT_APP_URL}/getFacilities`, config)
    .then((res) => {
      var data = res.data;
      var all_facilities = data.all_facilities
      all_facilities.forEach(fci => {Facilitiesoptions.push({
        value: fci, label: fci, facility: fci, check: true
      })})
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
                <h3> Create New Request </h3>
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
                    setRequest(e.target.value);
                  }}
                >
                  <option value="" disabled selected hidden>
                    Select your option
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
                <h5>Select Faculty :</h5>
              </div>
              <div className="col">
                <MultiSelect
                  options={Facultyoptions}
                  value={Faculty}
                  onChange={setFaculty}
                  labelledBy={"Select Your Option"}
                  className="Multiselect"
                />
              </div>
            </div>
            <br />
            <hr className="linew" />
            <br />
            <div className="row">
              <div className="col">
                <h5>Description :</h5>
              </div>
              <div className="col" style={{marginRight: "15px"}}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Enter Details about your event"
                    rows="3"
                    onChange={(e) => {
                      e.persist();
                      setDescription(e.target.value);
                    }}
                  />
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
              <div className="col" style={{marginLeft: "150px"}}>
                <div className="form-group">
                  <div className="row" style={{ color: "grey" }}>
                    <div class="col-sm-2 align-self-center" style={{textAlign: "center"}}>
                      <h6>Name</h6>
                    </div>
                    <div class="col-sm-2 align-self-center" style={{textAlign: "center"}}>
                      <h6>Roll.No</h6>
                    </div>
                    <div class="col-sm-2 align-self-center" style={{textAlign: "center"}}>
                      <h6>Dept</h6>
                    </div>
                    <div class="col-sm-2 align-self-center" style={{textAlign: "center"}}>
                      <h6>Year</h6>
                    </div>
                    <div class="col-sm-2 align-self-center" style={{textAlign: "center"}}>
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
                              id="name"
                              name="name"
                              placeholder="Name"
                              value={inputField.firstName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            />
                          </div>
                          <div class="col-sm-2">
                            <input
                              className="form-control"
                              type="text"
                              id="roll"
                              name="roll"
                              placeholder="Roll.no"
                              value={inputField.firstName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            />
                          </div>
                          <div class="col-sm-2">
                            <select
                              required
                              className="form-control"
                              style={{marginTop: "5px"}}
                              name="department"
                              value={inputField.firstName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder={`Dept`}
                            >
                              <option value="" disabled selected hidden>
                                Dept
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
                              name="department"
                              value={inputField.firstName}
                              style={{marginTop: "5px"}}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder={`Year`}
                            >
                              <option value="" disabled selected hidden>
                                Year
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                          <div div class="col-sm-2 align-self-center" style={{textAlign: "center"}}>
                            <button
                              type="button"

                              class="btn btn-danger btn-circle btn-sm"
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
                {
                  // <div className="form-group">
                  //   <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Facilities not mentioned? Type in here!" rows="3" onChange={e =>{e.persist(); setCustreq(e.target.value)}}/>
                  // </div>
                }
              </div>
            </div>
            <br />
            <hr className="linew" />
            <br />
            <div className="row">
              <div className="col" style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  class="btn btn-success"
                  onClick={() => {
                    submit();
                  }}
                >
                  Create Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateRequest;
