import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Request Components
import Camp from "../modules/LetterGeneration/Camp";
import Econ from "../modules/LetterGeneration/Eventconduct";
import Evenue from "../modules/LetterGeneration/Eventvenue";
import Tatten from "../modules/LetterGeneration/Attendanceteam";
import Patten from "../modules/LetterGeneration/AttendanceParticipants";
import Emeet from "../modules/LetterGeneration/conductmeet";
import CreateRequest from "../modules/RequestCreate/CreateRequest";
import EditCreateRequest from "../modules/RequestCreate/EditCreateRequest";
import { ProtectedRoute } from "./ProtectedRoute";

// //Route Component
// import { Route } from "./Route";

const RequestRoutes = () => {
  return (
    <div>
      <ProtectedRoute path="/Dashboard/CreateRequest" component={CreateRequest} />
      <Route
        path="/Dashboard/EditCreateRequest"
        component={EditCreateRequest}
      />
      <Route path="/campaining" component={Camp} />
      <Route path="/conduct" component={Econ} />
      <Route path="/venue" component={Evenue} />
      <Route path="/conductmeet" component={Emeet} />
      <Route path="/TeamAttendance" component={Tatten} />
      <Route path="/ParticipantsAttendance" component={Patten} />
    </div>
  );
};

export default RequestRoutes;
