import React from "react";
import axios from "axios";
import cslogo from "./images/cslogo.png";
import "./css/ForumProfile.css"
import NameModal from './NameModal';
import ProfileModal from "./ProfileModal";
import PhoneModal from './PhoneModal';
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
      <div><Nav/>
      <div className="container-fluid">
      <div className="containerz" >
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
        <div class="profile-container">
          <div class="table-responsive" >
            <table class="table profile-table" >
              <tr style={{borderRadius:"10px",padding:"2px"}}>
                <td colSpan="1">{this.state.profilename}</td>
                <td>
                <i class="far fa-edit" onClick={this.newElement} style={{ cursor: "pointer"}}></i>
                </td>
              </tr>
              <tr>
                <td colSpan="1">{this.state.profileemail}</td>
                <td>
                <i class="far fa-edit" onClick={this.newElement1} style={{ cursor: "pointer"}}></i>
                </td>
              </tr>
              <tr>
                <td colSpan="1">{this.state.profilephone}</td>
                <td>
                <i class="far fa-edit" onClick={this.newElement2} style={{ cursor: "pointer"}}></i>
                </td>
              </tr>
              <tr>
                <td colSpan="1">xxxxxxxx</td>
                <td>
                <i class="far fa-edit" onClick={this.newElement3} style={{ cursor: "pointer"}}></i>
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
