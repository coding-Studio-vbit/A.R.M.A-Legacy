import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './pforms.css'
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery';
import 'popper.js';

const select = () =>{
   return (
    <div class="btn-group">
    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
    select Letter
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="./camp">Campaigning</a>
    <a class="dropdown-item" href="./econ">Conduct Event</a>
    <a class="dropdown-item" href="./evenue">Event Venue</a>
    <a class="dropdown-item" href="./tatten">Attendance for Team</a>
    <a class="dropdown-item" href="./patten">Attendance for Participants</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="/">Custom Letter</a>
  </div>
    </div>
   );
 };

 export default select;