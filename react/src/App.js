import React from "react";
// import "../css/Form.css";
//import UserForm from "./userForm";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
<<<<<<< HEAD:react/src/App.js
import Login from "./Login";
import Register from "./Register";
import FacultyRegister from "./FacultyRegistration";
import FacultyLogin from "./FacultyLogin";

//Dashboard Routes
import Dashboard from "./modules/Dashboard/Dashboard";
import TemplateDetails from "./modules/Dashboard/TemplateDetails";
import Remarks from "./modules/Dashboard/Remarks";
import TemplateList from "./modules/Dashboard/TemplateList";
import ViewStatus from "./modules/Dashboard/ViewStatus";
=======
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import Dashboard from "./components/Dashboard";
import TemplateDetails from "./components/TemplateDetails";
import FacultyRegister from "./modules/Auth/FacultyRegistration";
import FacultyLogin from "./modules/Auth/FacultyLogin";
import Remarks from "./components/Remarks";
import TemplateList from "./components/TemplateList";
import ViewStatus from "./components/ViewStatus";
>>>>>>> 818ef94ef779d245a8b0a089962e0ac6b4ee894a:react/src/components/App.js

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
            <Route path="/Dashboard/CreateRequest" component={CreateRequest} />
            <Route
              path="/Dashboard/EditCreateRequest"
              component={EditCreateRequest}
            />
            <Route path="/facultylogin" component={FacultyLogin} />
            <Route path="/facultyregister" component={FacultyRegister} />
<<<<<<< HEAD:react/src/App.js


=======
            <Route path="/Remarks" component={Remarks} />
            <Route path="/Dashboard/TemplateList" component={TemplateList} />
            <Route path="/ViewStatus" component={ViewStatus} />
>>>>>>> 818ef94ef779d245a8b0a089962e0ac6b4ee894a:react/src/components/App.js

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
