import React, { useState, Fragment } from 'react'
import "../css/Letter.css"
import "react-bootstrap"

const TemplateDetails = () => {
  const [inputFields, setInputFields] = useState([
      { Name: "", Roll: "" }
    ]);
  
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
      if (event.target.name === "firstName") {
        values[index].Name = event.target.value;
      } else {
        values[index].Roll = event.target.value;
      }
  
      setInputFields(values);
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      console.log("inputFields", inputFields);
    };

    return (
      <form onSubmit={handleSubmit}>
          <div id="booking" className="section">
              <div className="section-center">
                  <div className="container-fluid">
                      <div className="row">
                          <div className="booking-form">
                              <form>
                                  <h3 style={{textAlign: 'center'}}>Permission for Campaigning Inside/Outside College</h3>
                                  <br/><br/>
                                  <div className="form-group">
                                      <span className="form-label">Designation: </span>
                                      <select className="form-control">
                                          <option>Head of Department</option>
                                          <option>Director</option>
                                      </select>
                                      <span className="select-arrow"></span>
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Department: </span>
                                      <select className="form-control">
                                          <option>Department of Computer Science and Engineering</option>
                                          <option>Department of Information Technology</option>
                                          <option>Department of Electrical and Electronics Engineering</option>
                                          <option>Department of Electronics and Communication Engineering</option>
                                          <option>Department of Civil Engineering</option>
                                          <option>Department of Mechanical Engineering</option>
                                      </select>
                                      <span className="select-arrow"></span>
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Date : </span>
                                      <input className="form-control" type="date" required />
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Subject :</span>
                                      <input className="form-control" type="tel" placeholder="Enter Letter Subject" />
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Respects : </span>
                                          <select className="form-control">
                                              <option>Sir</option>
                                              <option>Ma'am</option>
                                          </select>
                                      <span className="select-arrow"></span>
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Forrum/Team name : </span>
                                      <input className="form-control" type="text" placeholder="Enter name" />
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Event Name</span>
                                      <input className="form-control" type="tel" placeholder="Enter event name" />
                                  </div>
                                  <br />
                                  <div className="form-group">
                                      <span className="form-label">Inside / Outside : </span>
                                          <select className="form-control">
                                              <option>Inside</option>
                                              <option>Outside</option>
                                          </select>
                                      <span className="select-arrow"></span>
                                  </div>
                                  <br />
                                  <span className="form-label">Select Date and Time :</span>
                                  <br />
                                  <div className="row">
                                      <div className="col-sm-5">
                                          <div className="form-group">
                                          <span className="form-label">From</span>
                                          <input className="form-control" type="date" required />
                                      </div>
                                  </div>
                                  <div className="col-sm-7">
                                      <div className="row">
                                          <div className="col-sm-4">
                                              <div className="form-group">
                                              <span className="form-label">Hour</span>
                                              <select className="form-control">
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
                                          <span className="form-label">Min</span>
                                          <select className="form-control">
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
                                          <span className="form-label">AM/PM</span>
                                          <select className="form-control">
                                              <option>AM</option>
                                              <option>PM</option>
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
                              <span className="form-label">To</span>
                              <input className="form-control" type="date" required />
                          </div>
                      </div>
                      <div className="col-sm-7">
                          <div className="row">
                              <div className="col-sm-4">
                                  <div className="form-group">
                                      <span className="form-label">Hour</span>
                                          <select className="form-control">
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
                                      <span className="form-label">Min</span>
                                          <select className="form-control">
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
                                      <span className="form-label">AM/PM</span>
                                          <select className="form-control">
                                              <option>AM</option>
                                              <option>PM</option>
                                          </select>
                                      <span className="select-arrow"></span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <br />
                  <div className="form-group">
                      <span className="form-label">About your event body : </span>
                      <input className="form-control" type="text" placeholder="Enter about Event" />
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
                                              onChange={event => handleInputChange(index, event)}
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
                                              onChange={event => handleInputChange(index, event)}
                                              placeholder={`Roll No`}
                                          />
                                      </div>
                                      <div class="col align-self-center">
                                          <button type="button" class="btn btn-danger" onClick={() => handleRemoveFields(index)}>X</button>
                                      </div>
                                  </div>
                              </div>
                          </Fragment>
                      ))}                        
                  <button type="button" class="btn btn-info" onClick={() => handleAddFields()}>Add</button>
                  <br /><br />
                  <div className="form-btn">
                      <button className="submit-btn">Generate Letter</button>
                  </div>
                  </form>
                  </div>
                  </div>
                  </div>
              </div>
          </div>
      </form>
    );
}

export default TemplateDetails;

