import React from "react";
import axios from "axios";
import cslogo from "./images/cslogo.png";
import "./css/ForumProfile.css"
import NameModal from './NameModal';
import ProfileModal from "./ProfileModal";
import PhoneModal from './PhoneModal';
import PassModal from "./PassModal";

class Profile extends React.Component {
  state = {
    profilename: "",
    profileemail: "",
    profilephone: "",

    persons: [],
    Nameon:undefined,
    Editingon: undefined,   
    Phoneon: undefined,
    Passwordon: undefined,
    
  };
  newElement = () => {
    this.setState(() => ({
      Nameon: true,
    }));
  };
  newElement1 = () => {
    this.setState(() => ({
      Editingon: true,
    }));
  };
  newElement2 = () => {
    this.setState(() => ({
      Phoneon: true,
    }));
  };
  newElement3 = () => {
    this.setState(() => ({
      Passwordon: true,
    }));
  }; 

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios
      .get(`${process.env.REACT_APP_URL}/getForumDetails`, config)
      .then((res) => {
        const persons = res.data;
        this.setState({
          profilename: res.data.actual_name,
          profileemail: res.data.email,
          profilephone: res.data.phone_no,
        });
        console.log(persons);
      });
  }
  render() {
    const items = this.state.persons.map((item) => {
      return (
        <tr>
          <td>{item.Name}</td>
          <td>{item.Email}</td>
          <td>{item.Phone}</td>
          <td>{item.Password}</td>

        </tr>
      );
    });

    return (
      <div class="containerz" >
        <h1 className="header-responsive"><a><span>ACCOUNT</span></a></h1>
        <div className="profile-pic">
          <img
            src={cslogo}
            alt="Logo"
            style={
              {
                width: "177px",
                height: "174px" ,
                borderRadius:"50%",
                overflow: "hidden",

              }
            }
            roundedCircle
          />
        </div>
        <br />
        <div class="container">
          <div class="table-responsive" >
            <table class="table" >
              <tr style={{borderRadius:"10px",padding:"2px"}}>
                <td colSpan="1">{this.state.profilename}</td>
                <td>
                <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent",borderBlockStyle:"hidden"}} onClick={this.newElement}></button>
                </td>
              </tr>
              <tr>
                <td colSpan="1">{this.state.profileemail}</td>
                <td>
                <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newElement1}></button>
                </td>
              </tr>
              <tr>
                <td colSpan="1">{this.state.profilephone}</td>
                <td>
                <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newElement2}></button>
                </td>
              </tr>              
              <tr>
                <td colSpan="1">xxxxxxxx</td>
                <td>
                <button title="Edit" size="sm" color="info" className="fa fa-pencil" style={{color:"white" ,backgroundColor:"transparent" , borderBlockColor:"transparent"}} onClick={this.newElement3}></button>
                </td>
              </tr>
              <tbody>{items}</tbody>
            </table>
          </div>
          {/* <span onChange = "newElement()" className="btn btn-primary float-right">EDIT</span> */}
          <NameModal Editingon={this.state.Nameon} />
          <ProfileModal Editingon={this.state.Editingon} />
          <PhoneModal Editingon={this.state.Phoneon} />
          <PassModal Editingon={this.state.Passwordon} />
        </div>
      </div>
    );
  }
}
const Action = (props) => {
  return (
    <div>
      <button onClick={props.newElement}>Edit</button>
    </div>
  );
};

export default Profile;
