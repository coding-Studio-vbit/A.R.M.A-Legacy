import React, { useState } from "react";
import axios from "axios";
import download from 'js-file-download';

const Econ = () => {
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

    const handleSubmit = e => {
        e.preventDefault();
        console.log(team_name, date, subject, respects, event_name, letter_body, fromdate, start_hour, start_min,
                    start_meridian, todate, end_hour, end_min, end_meridian,hall_name );
        
      };

      const submit = (e) => {
            console.log("inputFields", team_name);
                
            axios.post('/conductevent', { team_name, date, subject, respects, event_name, letter_body, fromdate, start_hour, start_min,
                start_meridian, todate, end_hour, end_min, end_meridian,hall_name },{responseType: 'arraybuffer'})
           .then((result) => {
            console.log(result)
            //download(result.data, 'Team_Attendance_Permission.docx');
            const file = new Blob([result.data], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              });
              download(file, 'Event_Conduct_Permission.docx');
           });

      }


    return (
        <form onSubmit={handleSubmit}>
        <div id="booking" className="section">
        <div className="section-center">
        <div className="container">
            <div className="row">
                <div className="booking-form">
                    <form id="txtb" method="POST" action="/conductevent">
                        <h3 style={{textAlign: 'center'}}>Permisssion to Conudct an Event</h3>
                        <br/><br/>
                        <div className="form-group">
                            <span className="form-label" for="date">Date : </span>
                            <input className="form-control" name="date" type="date" required onChange={e => setDate(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="subject">Subject : </span>
                            <input className="form-control" type="tel" name="subject" placeholder="Enter About event" onChange={e => setSubject(e.target.value)} />
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="respects">Respects : </span>
                                <select className="form-control" name="respects" onChange={e => setRespects(e.target.value)}>
                                    <option>Sir</option>
                                    <option>Ma'am</option>
                                </select>
                            <span className="select-arrow"></span>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="team_name">Forrum/Team name : </span>
                            <input className="form-control" type="text" name="team_name" placeholder="Enter name" onChange={e => setTeamname(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="event_name">Your Event Name : </span>
                            <input className="form-control" type="text" for="event_name" placeholder="Enter name" onChange={e => setEventname(e.target.value)}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label" for="hall_name">Enter Hall Name : </span>
                            <input className="form-control" type="text" name="hall_name" placeholder="Enter name" onChange={e => setHallname(e.target.value)}/>
                        </div>
                        <br />
                        <span className="form-label">Select Date and Time :</span>
                        <br />
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <span className="form-label" for="fromdate">From</span>
                                    <input className="form-control" name="fromdate" type="date" required onChange={e => setFromdate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="start_hour">Hour</span>
                                            <select className="form-control" name="start_hour" onChange={e => setStarthour(e.target.value)}>
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
                                            <span className="form-label" for="start_min">Min</span>
                                            <select className="form-control" name="start_min" onChange={e => setStartmin(e.target.value)}>
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
                                            <span className="form-label" for="start_meridian">AM/PM</span>
                                            <select className="form-control" name="start_meridian" onChange={e => setStartmeridian(e.target.value)}>
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
                                    <span className="form-label" for="todate">To</span>
                                    <input className="form-control" type="date" name="todate" required onChange={e => setTodate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <span className="form-label" for="end_hour">Hour</span>
                                            <select className="form-control" name="end_hour" onChange={e => setEndhour(e.target.value)}>
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
                                            <span className="form-label" for="end_min">Min</span>
                                            <select className="form-control" name="end_min" onChange={e => setEndmin(e.target.value)}>
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
                                            <span className="form-label" for="end_meridian">AM/PM</span>
                                            <select className="form-control" name="end_meridian" onChange={e => setEndmeridian(e.target.value)}>
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
                            <span className="form-label" for="letter_body">About your event body : </span>
                            <input className="form-control" type="text" name="letter_body" placeholder="Enter about Event" onChange={e => setLetterbody(e.target.value)}/>
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

 export default Econ;