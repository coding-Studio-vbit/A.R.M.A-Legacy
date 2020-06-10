import React from "react";
import axios from "axios";
import cslogo from "./images/cslogo.png";
import "./css/ForumProfile.css"
import NameModal from './NameModal';
import ProfileModal from "./ProfileModal";
import PassModal from "./PassModal";
import Nav from "./Navi";

class Profile extends React.Component {
  state = {
    profilename: "",
    profileemail: "",
    profilephone: "",

    persons: [],
    Nameon:undefined,
    Editingon: undefined,
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
    return (
      <div><Nav/>
      <div className="container-fluid">
      <div className="containerz" >
        <h1 className="header-responsive"><a><span>ACCOUNT</span></a></h1>

        <br />
        <div class="profile-container">
        <div className="profile-pic">
          <img
            src={cslogo}
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
                  <div className="profile-text" colSpan="1">{this.state.profilename}</div>
                  <div className="profile-text" style={{float:"right"}} >
                  <i class="far fa-edit" onClick={this.newElement} style={{ cursor: "pointer"}}></i>
                  </div>
                </div>
              </tr>
              <tr>
                <div className="dataSnippet">
                  <div className="profile-text" colSpan="1">{this.state.profileemail}</div>
                  <div className="profile-text" style={{float:"right"}}>
                  <i class="far fa-edit" onClick={this.newElement1} style={{ cursor: "pointer"}}></i>
                  </div>
                </div>
              </tr>
              <tr>
              <div className="dataSnippet">
                <div className="profile-text" colSpan="1">{this.state.profilephone}</div>
                <div className="profile-text" style={{float:"right"}}>
                <i class="far fa-edit"  style={{color:"red"}}></i>
                </div>
              </div>
              </tr>
              <tr>
              <div className="dataSnippet">
                <div className="profile-text" colSpan="1">xxxxxxxx</div>
                <div className="profile-text" style={{float:"right"}}>
                <i class="far fa-edit" onClick={this.newElement2} style={{ cursor: "pointer"}}></i>
                </div>
              </div>
              </tr>
            </table>
          </div>
          {/* <span onChange = "newElement()" className="btn btn-primary float-right">EDIT</span> */}
          <NameModal Editingon={this.state.Nameon} />
          <ProfileModal Editingon={this.state.Editingon} />
          <PassModal Editingon={this.state.Passwordon} />
        </div>
      </div>
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
