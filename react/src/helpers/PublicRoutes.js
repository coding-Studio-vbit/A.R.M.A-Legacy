import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Login Components
import Templates from "../modules/PublicTemplates/PublicTemplateList";

const LoginRoutes = () => {
  return (
    <div>
      <Route path="/tlist" component={Templates} />
    </div>
  );
};

export default LoginRoutes;
