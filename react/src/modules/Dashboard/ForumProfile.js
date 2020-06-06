import React from "react";
import axios from "axios";
import profilePic from "./images/profilePic.png";
import ProfileModal from "./ProfileModal";
import PassModal from "./PassModal";
import NameModal from './NameModal';
import Nav from "./Navi";

class Profile extends React.Component {
  state = {
    profilename: "",
    profileemail: "",
    profilephone: "",

    persons: [],
    Editingon: undefined,
    Nameon:undefined,
    Passwordon: undefined,
  };
  newElement = () => {
    this.setState(() => ({
      Editingon: true,
    }));
  };
  newElement1 = () => {
    this.setState(() => ({
      Passwordon: true,
    }));
  };
  newElement2 = () => {
    this.setState(() => ({
      Nameon: true,
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
          <td>{item.Password}</td>
          <td>{item.Phone}</td>
        </tr>
      );
    });

    return (
      <div class="containerz" style={{ textAlign: "center" }}>
        <div className="profile-pic">
          <img
            src={profilePic}
            alt="Logo"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <br />
        <div class="container" style={{ width: "700px" }}>
          <div class="table-responsive">
            <table class="table" bordered hover variant="dark">
              <thead>
                <tr>
                  <th colspan="1" style={{ fontSize: "40px" }}>
                    Profile
                  </th>
                </tr>
              </thead>

              <tr>
                <td>Name</td>
                <td colSpan="2">{this.state.profilename}</td>
                <td>
                <button onClick={this.newElement2}>Edit</button>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Email</td>
                <td colSpan="2">{this.state.profileemail}</td>
                <td>
                  <button onClick={this.newElement}>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td colSpan="2">xxxxxxxx</td>
                <td>
                  <button onClick={this.newElement1}>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td colSpan="2">{this.state.profilephone}</td>
                <td></td>
              </tr>
              <tbody>{items}</tbody>
            </table>
          </div>
          {/* <span onChange = "newElement()" className="btn btn-primary float-right">EDIT</span> */}
          <ProfileModal Editingon={this.state.Editingon} />
          <PassModal Editingon={this.state.Passwordon} />
          <NameModal Editingon={this.state.Nameon} />
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
