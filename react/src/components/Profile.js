import React from 'react';
import axios from 'axios';

import profilePic from '../images/profilePic.png';

class Profile extends React.Component{
  state = {
    persons: []
  }

  componentWillMount() {
    // axios.get(`http://localhost:8080/Dashboard`)
    //   .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //     console.log(persons);
    //   })
  }

  render() {
    const items=this.state.persons.map(item =>{return(

       <tr>
          <td>{item.Name}</td>
          <td>{item.Email}</td>
          <td>{item.Password}</td>
          <td>{item.Phone}</td>
    </tr>

             )
    })
    return (
      <div class="containerz">
        <div className="profile-pic">
            <img src={profilePic} alt="Logo" style={{ width: "150px", height: "150px" }}/>
            </div>
            <br/>
        <div class="container" style={{width: "700px"}}>
          <div class="table-responsive">
           <table class="table" bordered hover variant="dark">
           <thead>
           <tr>
           <th colspan="1">Profile</th>
           </tr>
           </thead>
           <tr>
          <td>Name</td>
          <td colSpan="2">coding.Studio();</td>
          </tr>
          <tr>
          <td>Email</td>
          <td colSpan="2">executives@codingstudio.club</td>
           </tr>
           <tr>
          <td>Password</td>
          <td colSpan="2">xxxxxxxx</td>
           </tr>
           <tr>
          <td>Phone</td>
          <td colSpan="2">1234567890</td>
           </tr>
           <tbody>
           {items}
           </tbody>
           </table>
          </div>
        </div>
      </div>
    )
  }

}

export default  Profile;
