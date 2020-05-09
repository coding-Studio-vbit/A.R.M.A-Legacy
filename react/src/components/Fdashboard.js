import React from 'react';
import Table  from './Table';
import Nav from './Navi';
class Fdashboard extends React.Component{
  render(){
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
    return(
      <div>
      <Nav />
      <Table  data={stu_data} name={'Forum/Student'}/>
      </div>
    );
  }
}

export default Fdashboard;
