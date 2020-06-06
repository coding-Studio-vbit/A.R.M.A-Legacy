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

//ProtectedRoute Component
import { ProtectedRoute } from "./ProtectedRoute";

const RequestRoutes = () => {
  return(
    <div>
    <ProtectedRoute path="/Dashboard/CreateRequest" component={CreateRequest} />
    <ProtectedRoute path="/Dashboard/EditCreateRequest" component={EditCreateRequest} />
    <ProtectedRoute path="/campaining" component={Camp} />
    <ProtectedRoute path="/conduct" component={Econ} />
    <ProtectedRoute path="/venue" component={Evenue} />
    <ProtectedRoute path="/conductmeet" component={Emeet} />
    <ProtectedRoute path="/TeamAttendance" component={Tatten} />
    <ProtectedRoute path="/ParticipantsAttendance" component={Patten} />
    </div>
  );
}

export default RequestRoutes;
