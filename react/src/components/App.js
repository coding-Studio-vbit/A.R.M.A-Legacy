import React from "react";
import "../css/Form.css";
//import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import TemplateDetails from "./TemplateDetails";
import FacultyRegister from "./FacultyRegistration";
import FacultyLogin from "./FacultyLogin";
import Remarks from "./Remarks";
import TemplateList from "./TemplateList";
import ViewStatus from "./ViewStatus";

import {ProtectedRoute} from "./protected.route"

//LetterTemplates
import Camp from "./LetterTemplates/Camp";
import Econ from "./LetterTemplates/Eventconduct";
import Evenue from "./LetterTemplates/Eventvenue";
import Tatten from "./LetterTemplates/Attendanceteam";
import Patten from "./LetterTemplates/AttendanceParticipants";
import Emeet from "./LetterTemplates/conductmeet";
import Profile from "./Profile";
import CreateRequest from "./CreateRequest";
import EditCreateRequest from "./EditCreateRequest";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
            <ProtectedRoute
              path="/Dashboard/TemplateDetails"
              component={TemplateDetails}
            />
            <Route path="/Dashboard/CreateRequest" component={CreateRequest} />
            <Route path="/Dashboard/EditCreateRequest" component={EditCreateRequest} />
            <Route path="/facultylogin" component={FacultyLogin} />
            <Route path="/facultyregister" component={FacultyRegister} />
            <Route path="/Remarks" component={Remarks} />
            <Route path="/Dashboard/TemplateList" component={TemplateList} />
            <Route path="/ViewStatus" component={ViewStatus} />
            


            <Route path="/campaining" component={Camp} />
            <Route path="/conduct" component={Econ} />
            <Route path="/venue" component={Evenue} />
            <Route path="/conductmeet" component={Emeet}/>
            <Route path="/TeamAttendance" component={Tatten} />
            <Route path="/ParticipantsAttendance" component={Patten} />
            
            <ProtectedRoute path="/campaining" component={Camp} />
            <ProtectedRoute path="/conduct" component={Econ} />
            <ProtectedRoute path="/venue" component={Evenue} />
            <ProtectedRoute path="/TeamAttendance" component={Tatten} />
            <ProtectedRoute path="/ParticipantsAttendance" component={Patten} />

            <Login />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
