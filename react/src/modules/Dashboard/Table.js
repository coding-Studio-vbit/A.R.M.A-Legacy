import React from "react";
import "./css/table.css";
import axios from "axios";
import {Link} from 'react-router-dom';

class Table extends React.Component {
  /*approval = (id) =>{
    this.setState({data: this.state.data.map(temp => {
      if(temp.id===id){
        temp.approved = !temp.approved
        if(temp.approved) temp.status = 'Approved';
        else temp.status = 'pending';
      }
      return temp;
    }) });
  }*/
  state = {
    persons: [],
  };


  delete=(id)=>{
    console.log(id);
    let user = JSON.parse(localStorage.getItem("user"));
    if(user!==null){
      let userName = user.userName;
      let accessToken = user.accessToken;
      let config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
        data:{
          'request_id':id
        }
      }
      console.log(config);
      axios.delete("http://localhost:8080/createrequest",config).then((response) => {
        console.log("Deleted");
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    console.log(accessToken)
    let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
      }
    }
    axios.get("http://localhost:8080/forumdashboard",config)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(persons);
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    var i=1;
    const items=this.state.persons.map(item =>{return(

       <tr>
          <td style={{color: "#b007c4"}}>{i++}</td>
          <td>{item.subject}</td>
          <td>{item.status}</td>
          <td><a href="/ViewStatus" onClick={() => {
            localStorage.setItem('req_id',item.request_id);
          }}>Click me!</a></td>
          <td style={{"cursor":"pointer","color":"grey"}}><i class="far fa-edit"></i></td>
          <td style={{"cursor":"pointer","color":"grey"}}><i class="far fa-trash-alt" onClick={() =>{this.delete(item.request_id); this.forceUpdate()}} ></i></td>
       </tr>
     );
   })
    return (
      <div class="containerz">
        <div class="container">
          <div class="table-responsive">
           <table class="table">
           <thead>
           <tr>
           <th scope="col">#</th>
           <th scope="col">Subject</th>
           <th scope="col" style={{"width":"10%"}}>Status</th>
           <th scope="col">Remarks</th>
           <th scope="col" style={{"width":"5%"}}>Edit</th>
           <th scope="col" style={{"width":"5%"}}>Delete</th>
           {// <th scope="col"><center>Approve</center></th>
           }</tr>
           </thead>
           <tbody>
           {items}
           </tbody>
           </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
