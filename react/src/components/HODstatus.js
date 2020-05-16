import React from  "react";

import Table from './Table';

class HODstatus extends React.Component{
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
    var fal_data=[
      {
          id:1,
          Name:'John',
          subject:'Permission for Leave',
          status:'pending',
          approved : false
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
      return(
        <div> 
        <Table data={stu_data} name={name[0]} />
        <Table  data={fal_data} name={name[1]}/>
        </div>
      );
    }
  }
  
  export default HODstatus;
  
