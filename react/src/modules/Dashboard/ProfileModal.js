import React, { useState,useEffect} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import "./css/ProfileModal.css";
const ProfileModal =(props)=>{
    const [
        Email,setEmail
    ]=useState("");
    const [
      Cemail,setCemail
  ]=useState("");
  const [isMessage, setMessage] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });
    const isEnabled = Email === Cemail;

    return (
        <div>
    <Modal
    style={
      {
        overlay:{
          opacity:"1.0",
          margin:180,
          backgroundColor:""

        },
        content:{
          backgroundColor:"#222222",
          height:"320px",
          width:"800px",
          position:"absolute",
        }
      }
    }
    isOpen={props.Editingon}>
        <form>
         <div className="modal-header">
                    <h3 style={{color:"grey"}}>Edit Email</h3>
                    <button className="close-modal-btn" type="submit">X</button>
                </div>
                <div className="modal-content">
                <input type="email" id="myInput"  className="form-input" onChange ={(e) =>setEmail(e.target.value)}placeholder="Enter new email"></input><br/>
                <input type="email" id="myInput" className="form-input" onChange ={(e) =>setCemail(e.target.value)}placeholder="Confirm new email"></input><br/>
                <h5
              style={{
                display: !isEnabled ? "inline" : "none",
                color: "#ff1744",
              }}
              id="emailHelp"
              className="form-text">
              Enter the same email as above
            </h5>
                </div>
                <div className="modal-footer">
                <button  type="submit" className="submit-button" onClick={() =>{
                    let user = JSON.parse(localStorage.getItem("user"));
                    if(user!==null){
                      let userName = user.userName;
                      let accessToken = user.accessToken;
                      console.log(accessToken);
                      let config = {
                      headers: {
                        'Authorization': 'Bearer ' + accessToken
                      }
                    }
                      console.log(config);
                      axios.post("http://localhost:8080/changeForumEmail",{newEmail:Email},config).then((response) => {
                        var res=response.data;
                        this.setState({loginValue:response.data.userType});
                        console.log(res.userType);
                      })

                      .catch((err) => {
                        console.log(err);
                      })
                    }

                }}>SUBMIT</button>
                    <button className="btn-cancel" type="reset">CANCEL</button>
                </div>
                </form>
    </Modal>
    </div>
    )

}
export default ProfileModal;
