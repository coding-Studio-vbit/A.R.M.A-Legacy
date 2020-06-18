import React from "react";
import {Route,BrowserRouter as Router} from "react-router-dom" 

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
      <Route exact path="/tlist" component={Templates} />
      <Route path="/tlist/AllowanceLabExam" component={ALE}/>
      <Route path="/tlist/HalfDayLeave" component={HDL}/>
      <Route path="/tlist/HostelLeavePermission" component={HLL}/>
      <Route path="/tlist/LateFeePermission" component={LFP}/>
      <Route path="/tlist/LateRecordPermission" component={LRS}/>
      <Route path="/tlist/LateToClassPermission" component={LTC}/>
      <Route path="/tlist/LeavePermission" component={LP}/>
      <Route path="/tlist/AcknowledgeAbsencePermission" component={NAC}/>
      <Route path="/tlist/PeriodAttendancePermission" component={PAP}/>
    </div>
  );
};

export default LoginRoutes;
