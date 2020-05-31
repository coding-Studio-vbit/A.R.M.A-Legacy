import React from 'react';
import axios from 'axios';
import profilePic from './images/profilePic.png';
import ProfileModal from './ProfileModal';
import PassModal from './PassModal';
import NameModal from './NameModal';

class FacultyProfile extends React.Component{
  state = {
    facultyname:"",
    facultyroll:"",
    facultydept:"",
    facultyemail:"",
    facultyphone:"",

    persons: [
    ],
    Editingon: undefined,
    Passwordon:undefined,
    Nameon: undefined,
  };
  newEle1=()=>{
    this.setState(()=>({
      Editingon:true
    }))
  }
  newEle2=()=>{
    this.setState(()=>({
      Passwordon:true
    }))
  }
  newEle3=()=>{
    this.setState(()=>({
      Nameon:true
    }))
  }

componentWillMount() {
  let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
  let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
      }
    }
      axios.get(`http://localhost:8080/getFacultyDetails`,config)
      .then(res => {
        const persons = res.data;
        console.log(res.data);
        this.setState({ facultyname:res.data.faculty_name,facultyroll:res.data.faculty_roll,facultydept:res.data.faculty_dept,facultyemail:res.data.email,facultyphone:res.data.phone_no,});
        console.log(persons);
      })
  }
  render() {
    const items=this.state.persons.map(item =>{return(

       <tr>
          <td>{item.Name}</td>
          <td>{item.Roll}</td>
          <td>{item.Dept}</td>
          <td>{item.Email}</td>
          <td>{item.Password}</td>
          <td>{item.Phone}</td>
    </tr>

             )
    })

    return (
      <div class="containerz" style={{textAlign: "center" }}>
        <div className="profile-pic">
            <img src={profilePic} alt="Logo" style={{ width: "150px", height: "150px" }}/>
            </div>
            <br/>
        <div class="container" style={{width: "700px"}}>
          <div class="table-responsive">
           <table class="table" bordered hover variant="dark">
           <thead>
           <tr>
           <th colspan="1" style={{fontSize:"40px"}}>Profile</th>
           </tr>
           </thead>

           <tr>
          <td>Name</td>
    <td colSpan="2">{this.state.facultyname}</td>
          <td>
          <button onClick={this.newEle3}>Edit</button>
          </td>
          </tr>
          <tr>
          <td>Roll</td>
    <td colSpan="2">{this.state.facultyroll}</td>
    <td>
    </td>
          </tr>
          <tr>
          <td>Dept</td>
    <td colSpan="2">{this.state.facultydept}</td>
          <td>
          </td>
          </tr>
          <tr>
          <td>Email</td>
    <td colSpan="2">{this.state.facultyemail}</td>
          <td>
          <button onClick={this.newEle1}>Edit</button>
          </td>
           </tr>
           <tr>
          <td>Password</td>
          <td colSpan="2">xxxxxxxx</td>
          <td>
          <button onClick={this.newEle2}>Edit</button>
          </td>
           </tr>
           <tr>
          <td>Phone</td>
    <td colSpan="2">{this.state.facultyphone}</td>
          <td>
          </td>
           </tr>
           <tbody>
           {items}
           </tbody>
           </table>
          </div>
               {/* <span onChange = "newElement()" className="btn btn-primary float-right">EDIT</span> */}
          <ProfileModal
          Editingon={this.state.Editingon} />
          <PassModal
          Editingon={this.state.Passwordon} />
          <NameModal
          Editingon={this.state.Nameon} />

          </div>
          </div>
    )
  }
}
const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.newElement}
      >
      Edit
      </button>
    </div>
  );
};

export default  FacultyProfile;
