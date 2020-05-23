import React, { useState, Fragment } from "react";
import Nav from './Navi';
import axios from "axios";
import "../css/Request.css";
import 'react-bootstrap';
import MultiSelect from "react-multi-select-component";

const CreateRequest = () => {
    const [inputFields, setInputFields] = useState([
        { Name: "", Roll: "", Dept: "", Year: "" }
      ]);

      const [request, setRequest] = useState("")
      const [Faculty, setFaculty] = useState([]);
      const [Facilities, setFacilities] = useState([]);
      const [description, setDescription] = useState("")
      const [addfacilities, setCustreq] = useState("")

    
      const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ Name: "", Roll: "", Dept: "", Year: "" });
        setInputFields(values);
      };
    
      const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values); 
      };

    
      const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "Name") {
          values[index].Name = event.target.value;
        } else if(event.target.name === "Roll"){
          values[index].Roll = event.target.value;
        } else if(event.target.name === "Dept"){
          values[index].Dept = event.target.value;
        }else if(event.target.name === "Year"){
          values[index].Year = event.target.value;
        }

        setInputFields(values);
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        console.log(request, Faculty, description, Facilities, addfacilities);
        
      };

      var requestdetails =  inputFields;

      const submit = (e) => {
        
        var arr = []
        Faculty.forEach(item =>{
        arr.push(item.value)
        })
        console.log(arr)
        var arr1 = []
        Facilities.forEach(item =>{
        arr1.push(item.value)
        })
        console.log(arr1)

        let obj = {
          recipients: arr, 
          request_data: {
              description: description, 
                Facilities: arr1, 
                studentdetails: requestdetails,
                  type: request 
                }
      }
        //axios.post('/createrequest', {request, Faculty, description, Facilities, addfacilities, requestdetails },{responseType: 'arraybuffer'})
        //.then((result) => {
        //console.log(result)
       //});
        
       axios.post('/createrequest', {obj},{responseType: 'arraybuffer'})
        .then((result) => {
        console.log(result)
        })
        .catch(err => {console.log(err)})
      }

      const Facultyoptions = [
        { label: "saravanan", value: "saravanan" },
        { label: "Principal", value: "Principal" },
        { label: "Vice Principal", value: "Vice Principal" },
        { label: "CSE - HOD", value: "CSE - HOD" },
        { label: "IT - HOD", value: "IT - HOD" },
        { label: "ECE - HOD", value: "ECE - HOD" },
        { label: "EEE - HOD", value: "EEE - HOD" },
        { label: "CIVIL - HOD", value: "CIVIL - HOD" },
        { label: "MECH - HOD", value: "MECH - HOD" }

      ];
      

      const Facilitiesoptions = [
        { label: "SAC Room", value: "SAC Room" },
        { label: "Chethana", value: "Chethana" },
        { label: "Internet", value: "Internet" },

      ];

      
  
      return (
        <React.Fragment>
          <Nav/>
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
                          <select required className="form-control" name="department" onChange={e =>{e.persist(); setRequest(e.target.value)}}>
                            <option value="" disabled selected hidden>Select your option</option>
                            <option value="Attendance for Participants">Attendance for Participants</option>
                            <option value="Attendance for Team">Attendance for Team</option>
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
                          <MultiSelect options={Facultyoptions} value={Faculty} onChange={setFaculty} 
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
                        <div className="col">
                          <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Enter Details about your event" 
                            rows="3" onChange={e =>{e.persist(); setDescription(e.target.value)}} />
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
                              <div class="col-sm-2 align-self-center"><h6>Name</h6></div>
                              <div class="col-sm-2 align-self-center"><h6>Roll.No</h6></div>
                              <div class="col-sm-2 align-self-center"><h6>Dept</h6></div>
                              <div class="col-sm-2 align-self-center"><h6>Year</h6></div>
                              <div class="col align-self-center"><button type="button" class="btn btn-info" onClick={() => handleAddFields()}>Add</button></div>
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
                                                    name="Name" 
                                                    value={inputField.firstName}
                                                    onChange={event => handleInputChange(index, event)}
                                                    placeholder={`Name`}
                                                />
                                            </div>  
                                            <div class="col-sm-2">
                                                <input 
                                                    className="form-control"
                                                    type="text"
                                                    id="Roll"
                                                    name="Roll"
                                                    value={inputField.firstName}
                                                    onChange={event => handleInputChange(index, event)}
                                                    placeholder={`Roll No`}
                                                />
                                            </div>
                                            <div class="col-sm-2">
                                              <select required className="form-control" name="department" value={inputField.firstName}
                                                      onChange={event => handleInputChange(index, event)}
                                                      placeholder={`Dept`}
                                              >
                                                <option value="" disabled selected hidden>Dept</option>
                                                <option value="CSE">CSE</option>
                                                <option value="IT">IT</option>
                                                <option value="ECE">ECE</option>
                                                <option value="EEE">EEE</option>
                                                <option value="CIVIL">CIVIL</option>
                                                <option value="MECH">MECH</option>
                                              </select>
                                              
                                            </div>
                                            <div class="col-sm-2">
                                            <select required className="form-control" name="department" value={inputField.firstName}
                                                    onChange={event => handleInputChange(index, event)}
                                                    placeholder={`Year`}
                                            >
                                                <option value="" disabled selected hidden>Year</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                            
                                            </div>
                                            <div class="col align-self-center">
                                                <button type="button" class="btn btn-danger" onClick={() => handleRemoveFields(index)}>X</button>
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
                          <MultiSelect options={Facilitiesoptions} value={Facilities} onChange={setFacilities}
                              labelledBy={"Select Your Option"}
                              className="Multiselect"
                           />
                          <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Facelities not mentioned? Type in here!" rows="3" onChange={e =>{e.persist(); setCustreq(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <br />
                      <hr className="linew" />
                      <br />
                      <div className="row">
                        <div className="col" style={{textAlign:"center"}}>
                          <button type="submit" class="btn btn-success" onClick={() =>submit()}>Create Request</button>
                        </div>      
                      </div>     
                    </div>
                  </div>
            </form>
        </React.Fragment>
  );
}

export default CreateRequest;