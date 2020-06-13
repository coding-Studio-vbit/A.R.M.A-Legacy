import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";

//Login Components
import Templates from "../modules/PublicTemplates/PublicTemplateList";
import ALE from "../modules/PublicTemplates/PublicLetters/AllowanceLabExam";
import HDL from "../modules/PublicTemplates/PublicLetters/HalfdayLeave";
import HLL from "../modules/PublicTemplates/PublicLetters/HostelLeave";
import LFP from "../modules/PublicTemplates/PublicLetters/LateFeePermission";
import LRS from "../modules/PublicTemplates/PublicLetters/LateRecordSubmission";
import LTC from "../modules/PublicTemplates/PublicLetters/LateToClass";
import LP from "../modules/PublicTemplates/PublicLetters/Leave";
import NAC from "../modules/PublicTemplates/PublicLetters/NotAttendingClasses";
import PAP from "../modules/PublicTemplates/PublicLetters/PeriodAttendance"

const LoginRoutes = () => {
  return (
    <div>
      <ProtectedRoute exact path="/tlist" component={Templates} />
      <ProtectedRoute path="/tlist/AllowanceLabExam" component={ALE}/>
      <ProtectedRoute path="/tlist/HalfDayLeave" component={HDL}/>
      <ProtectedRoute path="/tlist/HostelLeavePermission" component={HLL}/>
      <ProtectedRoute path="/tlist/LateFeePermission" component={LFP}/>
      <ProtectedRoute path="/tlist/LateRecordPermission" component={LRS}/>
      <ProtectedRoute path="/tlist/LateToClassPermission" component={LTC}/>
      <ProtectedRoute path="/tlist/LeavePermission" component={LP}/>
      <ProtectedRoute path="/tlist/AcknowledgeAbsencePermission" component={NAC}/>
      <ProtectedRoute path="/tlist/PeriodAttendancePermission" component={PAP}/>
    </div>
  );
};

export default LoginRoutes;
