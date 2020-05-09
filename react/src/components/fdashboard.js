import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navi from './Navi'
import TemplateList from './TemplateList';
import TemplateDetails from './TemplateDetails';
import Submission from './Submission';
import Login from './Login'
import Fnavi from './Fnavi'

export default class fdashboard extends Component {
  render() {
    return (
      <div >
        <React.Fragment>
        <Navi/>
        <Fnavi/>
        <Switch>
          <Route exact={true} path="/fdashboard/" component={TemplateList}/>
          <Route path="/fdashboard/TemplateDetails" component={TemplateDetails}/>
          <Route  path="/fdashboard/Submission" component={Submission}/>
          <Login/>
        </Switch>
        </React.Fragment>

      </div>
    )
  }
}
