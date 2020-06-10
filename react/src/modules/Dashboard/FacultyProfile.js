import React from 'react';
import axios from 'axios';
import profilePic from './images/profilePic.png';
import NameModal from './NameModal';
import ProfileModal from './ProfileModal';
import PhoneModal from './PhoneModal';
import PassModal from './PassModal';
import "./css/ForumProfile.css";
import Nav from "./Navi";

class FacultyProfile extends React.Component{
  state = {
    facultyname:"",
    facultyroll:"",
    facultydept:"",
    facultyemail:"",
    facultyphone:"",

    persons: [
    ],
    Nameon: undefined,
    Editingon: undefined,
    Phoneon: undefined,
    Passwordon:undefined,

  };
  newEle1=()=>{
    this.setState(()=>({
      Nameon:true
    }))
  }
  newEle2=()=>{
    this.setState(()=>({
      Editingon:true
    }))
  }
  newEle3=()=>{
    this.setState(()=>({
      Phoneon:true
    }))
  }
  newEle4=()=>{
    this.setState(()=>({
      Passwordon:true
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
    const items = this.state.persons.map((item) => {
      return (
        <tr>
        <td>{item.Name}</td>
        <td>{item.Roll}</td>
        <td>{item.Dept}</td>
        <td>{item.Email}</td>
        <td>{item.Phone}</td>
        <td>{item.Password}</td>
        </tr>
      );
    });

    return (
      <div><Nav/>
      <div className="container-fluid">
      <div class="containerz">
        <h1 className="header"><a><span>ACCOUNT</span></a></h1>
        <div className="profile-pic">
          <img
            src={profilePic}
            alt="Logo"
            style={
              {
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius:"50%",

              }
            }
            roundedCircle
          />
        </div>
        <br />
        <div className="container">
        <div class="container-profile">
          <div class="table-responsive">
            <table class="table-profile">
           <tr>
          <td colSpan="1">{this.state.facultyname}</td>
          <td>
          <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newEle1}></button>
          </td>
          </tr>
          <tr>
          <td colSpan="1" >{this.state.facultyroll}</td>
          <td>
          </td>
          </tr>
          <tr>
          <td colSpan="1" >{this.state.facultydept}</td>
          <td>
          </td>
          </tr>
          <tr>
          <td colSpan="1">{this.state.facultyemail}</td>
          <td>
          <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newEle2}></button>
          </td>
          </tr>
          <tr>
          <td colSpan="1">{this.state.facultyphone}</td>
          <td>
          <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newEle3}></button>
          </td>
          </tr>
          <tr>
          <td colSpan="1"><input type="text" id="myInput" className="form-input" >XXXXXXXX</input></td>
          <td>
          <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newEle4}></button>
          </td>
          </tr>
          <tbody>
          {items}
          </tbody>
           </table>
           </div>
               {/* <span onChange = "newElement()" className="btn btn-primary float-right"></span> */}
          <NameModal
          Editingon={this.state.Nameon} />
          <ProfileModal
          Editingon={this.state.Editingon} />
          <PhoneModal
          Editingon={this.state.Nameon} />
          <PassModal
          Editingon={this.state.Passwordon} />

          </div>
          </div>
          </div>
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
