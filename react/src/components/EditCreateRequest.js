import React, { useState, Fragment } from "react";
import Nav from './Navi';
import "../css/Request.css";
import 'react-bootstrap';

const EditCreateRequest = () => {
    const [inputFields, setInputFields] = useState([
        { Name: "", Roll: "" }
      ]);

      const [department, setDepartment] = useState("")
    
      const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ Name: "", Roll: "" });
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
        }
    
        setInputFields(values);
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        console.log(department);
        
      };

      
  
      return (
        <React.Fragment>
          <Nav/>
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
                          <h5>Change Request Type :</h5>  
                        </div>
                        <div className="col self-align-end">
                          <select required className="form-control" name="department" onChange={e =>{e.persist(); setDepartment(e.target.value)}}>
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
                          <h5>Change Faculty :</h5>  
                        </div>
                        <div className="col">
                          <select required className="form-control" name="department" onChange={e =>{e.persist(); setDepartment(e.target.value)}}>
                            <option value="" disabled selected hidden>Select your option</option>
                            <option value="Principal">Principal</option>
                            <option value="Vice Principal">Vice Principal</option>
                            <option value="CSE - HOD">CSE - HOD</option>
                            <option value="IT - HOD">IT - HOD</option>
                            <option value="ECE - HOD">ECE - HOD</option>
                            <option value="EEE - HOD">EEE - HOD</option>
                            <option value="CIVIL - HOD">CIVIL - HOD</option>
                            <option value="MECH - HOD">MECH - HOD</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                      <br />
                      <hr className="linew" />
                      <br />
                      <div className="row">
                        <div className="col">
                          <h5>Edit Description :</h5>  
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Enter Details about your event" rows="3"></textarea>
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
                                                <input 
                                                    className="form-control"
                                                    type="text"
                                                    id="Roll"
                                                    name="Roll"
                                                    value={inputField.firstName}
                                                    onChange={event => handleInputChange(index, event)}
                                                    placeholder={`Dept`}
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
                                                    placeholder={`Year`}
                                                />
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
                          <h5>Edit Facilities Required :</h5>  
                        </div>
                        <div className="col">
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                            <h6 class="form-check-label" for="inlineCheckbox1">SAC</h6>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                            <h6 class="form-check-label" for="inlineCheckbox2">Internet Connection</h6>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                            <h6 class="form-check-label" for="inlineCheckbox3">Chethana</h6>
                          </div>
                          <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Facelities not mentioned? Type in here!" rows="3"></textarea>
                          </div>
                        </div>
                      </div>
                      <br />
                      <hr className="linew" />
                      <br />
                      <div className="row">
                        <div className="col align-self-center">
                          <button type="button" class="btn btn-primary">Update Request</button>
                        </div>     
                        <div className="col align-self-center">
                          <button type="button" class="btn btn-success">Create New Request</button>
                        </div>    
                        <div className="col align-self-center">
                          <button type="button" class="btn btn-danger">Delete Request</button>
                        </div>   
                      </div>     
                    </div>
                  </div>
            </form>
        </React.Fragment>
  );
}

export default EditCreateRequest;