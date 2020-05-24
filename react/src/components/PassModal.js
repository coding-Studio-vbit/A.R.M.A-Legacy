import React, { useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import "../css/ProfileModal.css";
const PassModal =(props)=>{
    const [
        NewPassword,setNewPassword
    ]=useState("");
    const [
        OldPassword,setOldPassword
    ]=useState("");

    return (
        <div>
    <Modal 
        style={
          {
            overlay:{
              opacity:"1.0",
              margin:250,
              backgroundColor:""
            },
            content:{
              backgroundColor:"#222222",
              height:"350px",
              width:"500px",
              position:"absolute",
            }
          }
        }
    isOpen={props.Editingon}>
        <form>
         <div className="modal-header">
                    <h3 style={{textDecorationColor:"black"}}>Edit Password</h3>
                    <button className="close-modal-btn" type="submit">X</button>
                </div>
                <div className="modal-body">
                <input type="password" id="myInput" className="form-input"  onChange ={(e) =>setOldPassword(e.target.value)}placeholder="Enter old Password"></input><br/>
                <input type="password" id="myInput" className="form-input" onChange ={(e) =>setNewPassword(e.target.value)}placeholder="Enter new Password"></input><br/>
                <input type="password" id="myInput" className="form-input" placeholder="Confirm new Password"></input><br/>
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
                      axios.post("http://localhost:8080/changeForumPassword",{newPassword:NewPassword,oldPassword:OldPassword},config).then((response) => {
                        var res=response.data;
                        this.setState({loginValue:response.data.userType});
                        console.log(res.userType);
                      }).catch((err) => {
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
export default PassModal;