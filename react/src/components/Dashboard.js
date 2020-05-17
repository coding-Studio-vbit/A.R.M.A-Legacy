import React from 'react';
import Table  from './Table';
import FacultyTable  from './FacultyTable';
import Nav from './Navi';
import TemplateList from './TemplateList';
import {Tab,Tabs} from 'react-bootstrap';
import axios from 'axios';
class Dashboard extends React.Component{


  render(){
    const loginValue=1;

    switch (loginValue) {

          case 1: return(
            <div>
            <Nav/>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Templates">
                <TemplateList/>
              </Tab>
              <Tab eventKey="profile" title="Current requests">
                <FacultyTable />
              </Tab>
            </Tabs>
            </div>
          );

      case 2:
        return (
          <div>
            <Nav />
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Templates">
                <TemplateList />
              </Tab>
              <Tab eventKey="profile" title="Current requests">
                <Table />
              </Tab>
            </Tabs>
          </div>
        );

      default:
        return (
          <div style={{ marginTop: "20%" }}>
            <center>
              <h1>
                Please, <a href="/login">Login.</a>
              </h1>{" "}
            </center>
          </div>
        );
    }
  }
}

export default Dashboard;
