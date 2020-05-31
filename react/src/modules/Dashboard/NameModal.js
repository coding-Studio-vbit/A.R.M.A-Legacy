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
                    <h3 style={{color:"grey"}}>Edit Name</h3>
                    <button className="close-modal-btn" type="submit">X</button>
                </div>
                <div className="modal-content">
                <input type="text" id="myInput"  className="form-input" onChange ={(e) =>setName(e.target.value)}placeholder="Enter new Name"></input><br/>
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
                      axios.post("http://localhost:8080/",{newName:Name},config).then((response) => {
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
export default NameModal;