import React from "react";
import Table from "./Table";
import Nav from "./Navi";
import TemplateList from "./TemplateList";
import { Tab, Tabs } from "react-bootstrap";
class Dashboard extends React.Component {
  loginType = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let username = user.userName;
  };
  render() {
    const loginValue = 2;

    switch (loginValue) {
      case 1:
        return (
          <div>
            <Nav />
            <Table />
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
