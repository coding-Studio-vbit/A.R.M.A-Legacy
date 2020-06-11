import React, { useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import "./css/ProfileModal.css";
const NameModal =(props)=>{
    const [
        Name,setName
    ]=useState("");
    return (
        <div> 
    <Modal
    style={
      {
        overlay:{
          opacity:"1.0",
          margin:220,
          backgroundColor:""

        },
        content:{
          backgroundColor:"#181A1B",
          height:"250px",
          width:"500px",
          position:"absolute",
          left: "35%",
          top: "50%",
        }
      }
    }
    isOpen={props.Editingon}>
        <form className="form-responsive">
         <div className="modal-header">
                    <h3 style={{color:"grey"}}></h3>
                    <button className="close-modal-btn" type="submit">X</button>
                </div>
                <div className="modal-content">
                <input type="text" id="myInput" style={{opacity:"1.0",width:"400px"}} className="form-input" onChange ={(e) =>setName(e.target.value)}placeholder="Enter new Name"></input><br/>
                </div>
                <div className="modal-footer">
                <button className="btn-cancel" type="reset">Cancel</button>
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
                      axios.post("http://localhost:8080/changeForumUsername",{newUsername:Name},config).then((response) => {
                        var res=response.data;
                        this.setState({loginValue:response.data.userType});
                        console.log(res.userType);
                      })

                      .catch((err) => {
                        console.log(err);
                      })
                    }
                
                }}>Save Changes</button>
                 
                </div>
                </form>
    </Modal>
    </div>
    )
        
}
export default NameModal;