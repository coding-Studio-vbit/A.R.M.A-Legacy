import React from "react";
// import "../css/Form.css";
//import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import Dashboard from "./components/Dashboard";
import TemplateDetails from "./components/TemplateDetails";
import FacultyRegister from "./modules/Auth/FacultyRegistration";
import FacultyLogin from "./modules/Auth/FacultyLogin";
import Remarks from "./components/Remarks";
import TemplateList from "./components/TemplateList";
import ViewStatus from "./components/ViewStatus";

import { ProtectedRoute } from "./components/protected.route";

//LetterTemplates
import Camp from "./components/LetterTemplates/Camp";
import Econ from "./components/LetterTemplates/Eventconduct";
import Evenue from "./components/LetterTemplates/Eventvenue";
import Tatten from "./components/LetterTemplates/Attendanceteam";
import Patten from "./components/LetterTemplates/AttendanceParticipants";
import Emeet from "./components/LetterTemplates/conductmeet";
import Profile from "./components/Profile";
import CreateRequest from "./components/CreateRequest";
import EditCreateRequest from "./components/EditCreateRequest";

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
            <Route
              path="/Dashboard/EditCreateRequest"
              component={EditCreateRequest}
            />
            <Route path="/facultylogin" component={FacultyLogin} />
            <Route path="/facultyregister" component={FacultyRegister} />
            <Route path="/Remarks" component={Remarks} />
            <Route path="/Dashboard/TemplateList" component={TemplateList} />
            <Route path="/ViewStatus" component={ViewStatus} />

            <Route path="/campaining" component={Camp} />
            <Route path="/conduct" component={Econ} />
            <Route path="/venue" component={Evenue} />
            <Route path="/conductmeet" component={Emeet} />
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
