import React from "react";

const evenue = () =>{
    return (
        <div id="booking" className="section">
    <div className="section-center">
        <div className="container">
            <div className="row">
                <div className="booking-form">
                    <form>
                        <h3 style={{textAlign: 'center'}}>Permisssion to use hall for conducting event / use hall to work</h3>
                        <br/><br/>
                        <div className="form-group">
                            <span className="form-label">Date : </span>
                            <input className="form-control" type="date" required />
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label">Subject : </span>
                            <input className="form-control" type="tel" placeholder="Enter About event" />
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
                            <span className="form-label">Your Event Name : </span>
                            <input className="form-control" type="text" placeholder="Enter name" />
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label">Reason : </span>
                            <input className="form-control" type="text" placeholder="i.e Conduct/Work for" />
                        </div>
                        <br />
                        <div className="form-group">
                            <span className="form-label">Enter Hall Name : </span>
                            <input className="form-control" type="text" placeholder="Enter Hall name" />
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
                        <div className="form-btn">
                            <button className="submit-btn">Generate Letter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
        );
 };

 export default evenue;