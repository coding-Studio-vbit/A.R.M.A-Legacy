import React from 'react';
import axios from 'axios';
import profilePic from './images/profilePic.png';
import {Row, Col } from "react-bootstrap";
import FacultyNModal from './FacultyNModal';
import FacultyEModal from './FacultyEModal';
import FacultyPsModal from './FacultyPsModal';
import "../../css/styles.css";
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
      axios.get(`${process.env.REACT_APP_URL}/getFacultyDetails`,config)
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
      console.log(item)
    });

    return (
      <div><Nav/>
      <div className="container-fluid">
      <div className="containerz" >
      <Row>
        <h1 className="header-responsive"><a><span>ACCOUNT</span></a></h1>

        <br />
        </Row>
        <Row>
        <div class="profile-container">
        <div className="profile-pic">
          <img
            src={profilePic}
            alt="Logo"
            style={
              {
                width: "127px",
                height: "124px" ,
                borderRadius:"50%",
                overflow: "hidden",

              }
            }
            roundedCircle
          />
        </div>
          <div class="table-responsive">
            <table class="table profile-table" >
              <tr style={{borderRadius:"10px",padding:"2px"}}>
                <div className="dataSnippet" >
                  <div className="profile-text" colSpan="1">{this.state.facultyname}</div>
                  <div className="profile-text" style={{float:"right"}} >
                  <i class="far fa-edit" onClick={this.newEle1} style={{ cursor: "pointer"}}></i>
                  </div>
                </div>
              </tr>
              <tr>
                <div className="dataSnippet">
                  <div className="profile-text" colSpan="1">{this.state.facultyemail}</div>
                  <div className="profile-text" style={{float:"right"}}>
                  <i class="far fa-edit" onClick={this.newEle2} style={{ cursor: "pointer"}}></i>
                  </div>
                </div>
              </tr>
              <tr>
                <div className="dataSnippet">
                  <div className="profile-text" colSpan="1">{this.state.facultyroll}</div>
                  <div className="profile-text" style={{float:"right"}}>
                  <i class="far fa-edit" style={{ color:"red"}}></i>
                  </div>
                </div>
              </tr>
              <tr>
                <div className="dataSnippet">
                  <div className="profile-text" colSpan="1">{this.state.facultydept}</div>
                  <div className="profile-text" style={{float:"right"}}>
                  <i class="far fa-edit" style={{ color:"red"}}></i>
                  </div>
                </div>
              </tr>
              <tr>
              <div className="dataSnippet">
                <div className="profile-text" colSpan="1">{this.state.facultyphone}</div>
                <div className="profile-text" style={{float:"right"}}>
                <i class="far fa-edit"  style={{ color:"red"}}></i>
                </div>
              </div>
              </tr>
              <tr>
              <div className="dataSnippet">
                <div className="profile-text" colSpan="1">xxxxxxxx</div>
                <div className="profile-text" style={{float:"right"}}>
                <i class="far fa-edit" onClick={this.newEle3} style={{ cursor: "pointer"}}></i>
                </div>
              </div>
              </tr>
            </table>
          </div>
          {/* <span onChange = "newElement()" className="btn btn-primary float-right">EDIT</span> */}
          <Col>
          <FacultyNModal Editingon={this.state.Nameon} />
          <FacultyEModal Editingon={this.state.Editingon} />
          <FacultyPsModal Editingon={this.state.Passwordon} />
          </Col>
        </div>
        </Row>
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
