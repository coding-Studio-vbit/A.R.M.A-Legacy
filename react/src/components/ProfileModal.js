import React, { useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import "../css/ProfileModal.css";
const ProfileModal =(props)=>{
    const [
        Email,setEmail
    ]=useState("");
    
    return (
        <div> 
    <Modal
    style={
      {
        overlay:{
          padding:"60px",
        },
        content:{
          backgroundColor:"#222222",
          height:"400px",
          width:"600px",
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
                <input type="text" id="myInput"  style={{WebkitTextFillColor:"grey",borderBlockColor:"black"}} onChange ={(e) =>setEmail(e.target.value)}placeholder="Enter new email"></input><br/>
                <input type="text" id="myInput" style={{WebkitTextFillColor:"grey" }} placeholder="Confirm new email"></input><br/>
                </div>
                <div className="modal-footer">
                <button  type="submit" onClick={() =>{
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
export default ProfileModal;