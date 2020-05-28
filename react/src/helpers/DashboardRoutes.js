import React from "react";

//Dashboard Components
import Dashboard from "../modules/Dashboard/Dashboard";
import TemplateDetails from "../modules/Dashboard/TemplateDetails";
import Remarks from "../modules/Dashboard/Remarks";
import TemplateList from "../modules/Dashboard/TemplateList";
import ViewStatus from "../modules/Dashboard/ViewStatus";

//Protected Route component
import {ProtectedRoute} from "./ProtectedRoute";

const DashboardRoutes = () => {
  return(
    <div>
    <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
    <ProtectedRoute path="/Dashboard/TemplateDetails" component={TemplateDetails} />
    <ProtectedRoute path="/Remarks" component={Remarks} />
    <ProtectedRoute path="/Dashboard/TemplateList" component={TemplateList} />
    <ProtectedRoute path="/ViewStatus" component={ViewStatus} />
    </div>
  );
}

export default DashboardRoutes;
