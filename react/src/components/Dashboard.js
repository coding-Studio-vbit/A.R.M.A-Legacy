import React from 'react';
import Table  from './Table';
import FacultyTable  from './FacultyTable';
import Nav from './Navi';
import TemplateList from './TemplateList';
import {Tab,Tabs} from 'react-bootstrap';
import axios from 'axios';
class Dashboard extends React.Component{
  constructor(){
    super();
    this.state={
      loginValue: ""
    }
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    console.log(accessToken);
    let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }
    console.log(config);
    axios.post("http://localhost:8080/getUserType",user,config).then((response) => {
      var res=response.data;
      this.setState({loginValue:response.data.userType});
      console.log(res.userType);
    }).catch((err) => {
      console.log(err);
    })
  }

  render(){

    const loginValue=this.state.loginValue;

    switch (loginValue) {

          case "FACULTY": return(
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

      case "FORUM":
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
                Please, <a href="/">Login.</a>
              </h1>{" "}
            </center>
          </div>
        );
        
    }
  }
}

export default Dashboard;
