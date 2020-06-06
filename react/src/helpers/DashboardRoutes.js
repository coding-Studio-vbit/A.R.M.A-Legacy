import React, { useState, useEffect } from "react";
import axios from "axios";

//Dashboard Components
import Dashboard from "../modules/Dashboard/Dashboard";
import TemplateDetails from "../modules/Dashboard/TemplateDetails";
import Remarks from "../modules/Dashboard/Remarks";
import TemplateList from "../modules/Dashboard/TemplateList";
import ViewStatus from "../modules/Dashboard/ViewStatus";
import ForumProfile from "../modules/Dashboard/ForumProfile";
import FacultyProfile from "../modules/Dashboard/FacultyProfile";

//Protected Route component
import {ProtectedRoute} from "./ProtectedRoute";

const DashboardRoutes = () => {
  const [type, setType] = useState("");
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      let userName = user.userName;
      let accessToken = user.accessToken;
      console.log(accessToken);
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      console.log(config);
      axios
        .post(`${process.env.REACT_APP_URL}/getUserType`, user, config)
        .then((response) => {
          var res = response.data;
          setType(response.data.userType );
          console.log(type);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  },[]);
  console.log(type);
  if(type=="FACULTY")
  return(
    <div>
    <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
    <ProtectedRoute path="/Dashboard/TemplateDetails" component={TemplateDetails} />
    <ProtectedRoute path="/Remarks" component={Remarks} />
    <ProtectedRoute path="/Dashboard/TemplateList" component={TemplateList} />
    <ProtectedRoute path="/ViewStatus" component={ViewStatus} />
    <ProtectedRoute path="/profile" component={FacultyProfile} />
    </div>
  );
 
  return(
    <div>
    <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
    <ProtectedRoute path="/Dashboard/TemplateDetails" component={TemplateDetails} />
    <ProtectedRoute path="/Remarks" component={Remarks} />
    <ProtectedRoute path="/Dashboard/TemplateList" component={TemplateList} />
    <ProtectedRoute path="/ViewStatus" component={ViewStatus} />
    <ProtectedRoute path="/profile" component={ForumProfile} />
    </div>
  );
}


export default DashboardRoutes;
