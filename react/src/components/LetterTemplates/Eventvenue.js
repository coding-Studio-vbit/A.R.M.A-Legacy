import React, { useState } from "react";
import axios from "axios";
import download from 'js-file-download';

const Evenue = () => {

    const [team_name, setTeamname] = useState("")
    const [hall_name, setHallname] = useState("")
    const [date, setDate] = useState("")
    const [subject, setSubject] = useState("")
    const [respects, setRespects] = useState("")
    const [event_name, setEventname] = useState("")
    const [letter_body, setLetterbody] = useState("")
    const [fromdate, setFromdate] = useState("")
    const [start_hour, setStarthour] = useState("")
    const [start_min, setStartmin] = useState("")
    const [start_meridian, setStartmeridian] = useState("")
    const [todate, setTodate] = useState("")
    const [end_hour, setEndhour] = useState("")
    const [end_min, setEndmin] = useState("")
    const [end_meridian, setEndmeridian] = useState("")
    const [reason, setReason] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        console.log(team_name, date, subject, respects, event_name, letter_body, fromdate, start_hour, start_min,
                    start_meridian, todate, end_hour, end_min, end_meridian,hall_name,reason );

      };

      const submit = (e) => {
            console.log("inputFields", team_name);

            axios.post('/usehall', { team_name, date, subject, respects, event_name, letter_body, fromdate, start_hour, start_min,
                start_meridian, todate, end_hour, end_min, end_meridian,hall_name,reason },{responseType: 'arraybuffer'})
           .then((result) => {
            console.log(result)
            //download(result.data, 'Team_Attendance_Permission.docx');
            const file = new Blob([result.data], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              });
              download(file, 'Event_Venue_Permission.docx');
           });

      }

    return (
        <form onSubmit={handleSubmit}>
        <div id="booking" className="section">
        <div className="section-center">
        <div className="container">
            <div className="row">
                <div className="booking-form">
                    <form id="txtb" method="POST" action="/usehall">
                        <h3 style={{textAlign: 'center'}}>Permisssion to use hall for conducting event / use hall to work</h3>
                        <br/><br/>
                        <div className="form-group">
                            <span className="form-label" for="date">Date : </span>
                            <input className="form-control" name="date" type="date" required onChange={e => setDate(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="subject">Subject : </span>
                            <input required className="form-control" type="tel" name="subject" placeholder="Enter About event" onChange={e => setSubject(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="respects">Respects : </span>
                            <select required className="form-control" name="respects" onChange={e => setRespects(e.target.value)}>
                                <option value="" disabled selected hidden>Select your option</option>
                                <option value="Sir">Sir</option>
                                <option value="Ma'am">Ma'am</option>
                            </select>
                            <span className="select-arrow"></span>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="team_name">Forrum/Team name : </span>
                            <input required className="form-control" name="team_name" type="text" placeholder="Enter name" onChange={e => setTeamname(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="event_name">Your Event Name : </span>
                            <input required className="form-control" type="text" name="event_name" placeholder="Enter name" onChange={e => setEventname(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="reason">Reason : </span>
                            <input required className="form-control" name="reason" type="text" placeholder="i.e Conduct/Work for" onChange={e => setReason(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="hall_name">Enter Hall Name : </span>
                            <input required className="form-control" type="text" name="hall_name" placeholder="Enter Hall name" onChange={e => setHallname(e.target.value)}/>
                        </div>
                        <br />
                        <span className="form-label">Select Date and Time :</span>
                        <br />
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <span className="form-label" for="fromdate">From</span>
                                    <input className="form-control" type="date" name="fromdate" required onChange={e => setFromdate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="start_hour">Hour</span>
                                            <select required className="form-control" name="start_hour" onChange={e =>{e.persist();  setStarthour(e.target.value)}}>
                                                <option value="" disabled selected hidden>...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="start_min">Min</span>
                                            <select required className="form-control" name="start_min" onChange={e =>{e.persist();  setStartmin(e.target.value)}}>
                                                <option value="" disabled selected hidden>...</option>
                                                <option value="00">00</option>
                                                <option value="05">05</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>
                                                <option value="35">35</option>
                                                <option value="40">40</option>
                                                <option value="45">45</option>
                                                <option value="50">50</option>
                                                <option value="55">55</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="start_meridian">AM/PM</span>
                                            <select required className="form-control" name="start_meridian" onChange={e =>{e.persist();  setStartmeridian(e.target.value)}}>
                                                <option value="" disabled selected hidden>...</option>
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
                                    <span className="form-label" for="todate">To</span>
                                    <input  className="form-control" name="todate" type="date" required onChange={e => setTodate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="end_hour">Hour</span>
                                            <select required className="form-control" name="end_hour" onChange={e =>{e.persist();  setEndhour(e.target.value)}}>
                                                <option value="" disabled selected hidden>...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="end_min">Min</span>
                                            <select required className="form-control" name="end_min" onChange={e =>{e.persist();  setEndmin(e.target.value)}}>
                                                    <option value="" disabled selected hidden>...</option>
                                                    <option value="00">00</option>
                                                    <option value="05">05</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                    <option value="20">20</option>
                                                    <option value="25">25</option>
                                                    <option value="30">30</option>
                                                    <option value="35">35</option>
                                                    <option value="40">40</option>
                                                    <option value="45">45</option>
                                                    <option value="50">50</option>
                                                    <option value="55">55</option>
                                                </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="end_meridian">AM/PM</span>
                                            <select required className="form-control" name="end_meridian" onChange={e =>{e.persist(); setEndmeridian(e.target.value)}}>
                                                <option value="" disabled selected hidden>...</option>
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
                            <span className="form-label" for="letter_body">About your event body : </span>
                            <input required className="form-control" name="letter_body" type="text" placeholder="Enter about Event" onChange={e => setLetterbody(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-btn">
                            <button className="submit-btn" type="submit" onClick={() =>submit()}>Generate Letter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</form>
        );
 };

 export default Evenue;
