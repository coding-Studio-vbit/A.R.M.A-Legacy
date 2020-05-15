import React from 'react';
import Table  from './Table';
import Nav from './Navi';
import TemplateList from './TemplateList';
import {Tab,Tabs} from 'react-bootstrap';
class Dashboard extends React.Component{
  render(){
    const loginValue=3;

    var stu_data=[
      {
          id:1,
          Name:'Coding Studio',
          subject:'Permission for codecraft',
          status:'pending',
          approved : false
      },
      {
          id:2,
          Name:'Coding Studio',
          subject:'Permission for codecraft',
          status:'pending',
          approved : false
      },
      {
          id:3,
          Name:'Coding Studio',
          subject:'Permission for codecraft',
          status:'pending',
          approved : false
      },
      {
          id:4,
          Name:'Coding Studio',
          subject:'Permission for codecraft',
          status:'pending',
          approved : false
      }
  ]
  var fal_data=[
    {
        id:1,
        Name:'John',
        subject:'Permission for Leave',
        status:'pending',
        approved : false,
        details : {}
    },
    {
        id:2,
        Name:'John',
        subject:'Permission for Leave',
        status:'pending',
        approved : false
    },
    {
        id:3,
        Name:'John',
        subject:'Permission for Leave',
        status:'pending',
        approved : false
    },
    {
        id:4,
        Name:'John',
        subject:'Permission for Leave',
        status:'pending',
        approved : false
    }
]
    var name=['Forum/Student','Faculty'];

    switch (loginValue) {

          case 1: return(
            <div>
            <Nav />
            <Table data={stu_data} name={name[0]} />
            <Table  data={fal_data} name={name[1]}/>
            </div>
          );

          case 2: return(
            <div >
            <Nav />
            <Table  data={stu_data} name={'Forum/Student'}/>
            <h3 style={{color:'white'}}>{stu_data.Name}</h3>
            </div>
          );

          case 3: return(
            <div>
            <Nav/>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Templates">
                <TemplateList/>
              </Tab>
              <Tab eventKey="profile" title="Current requests">
                <Table  data={stu_data} name={'Forum'}/>
              </Tab>
            </Tabs>
            </div>
          )

          default: return(
            <div style={{marginTop:'20%'}}><center> <h1>Please, <a href="/login">Login.</a></h1> </center></div>
          );
        }
  }
}

export default Dashboard;
