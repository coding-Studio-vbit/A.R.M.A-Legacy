import React from 'react';
import Table  from './Table';
import FacultyTable  from './FacultyTable';
import Nav from './Navi';
import TemplateList from './TemplateList';
import LoadingScreen from './LoadingScreen';
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
    if(user!==null){
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
  }
  

  render(){

    const loginValue=this.state.loginValue;
    // const login="FACULTY";

    switch (loginValue) {

          case "FACULTY": return(
            <div>
            <Nav/>
            <FacultyTable />
            </div>
          );

      case "FORUM":
        return (
          <div>
            <Nav/>
            <Table />
          </div>
        );

      default:
        return (
          <LoadingScreen/>
        );

    }
  }
}

export default Dashboard;
