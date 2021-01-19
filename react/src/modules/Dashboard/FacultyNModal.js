import React, { useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import "../../css/styles.css";
const FacultyNModal =(props)=>{
    const [
        Name,setName
    ]=useState("");
    return (
        <div class="modal">
    <Modal
    style={
      {
        overlay:{
          opacity:"1.0",
          margin:300,
          backgroundColor:""

        },
        content:{
          backgroundColor:"#181A1B",
          height:"250px",
          width:"400px",
          position:"absolute",
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-30%',

          left: "20%",
          top: "50%",
        }
      }
    }
    isOpen={props.Editingon}>
        <form>
         <div className="modal-header">
                    <h3 style={{color:"grey"}}></h3>
                    <button className="close-modal-btn" type="submit">X</button>
                </div>
                <div className="modal-content">
                <input type="text" id="myInput" style={{opacity:"1.0",width:"300px"}} className="form-inputs" onChange ={(e) =>setName(e.target.value)}placeholder="Enter new Name"></input><br/>
                </div>
                <div className="modal-footer" style={{height:"100px"}}>
                <button className="btn-cancel" type="reset">Clear</button>
                <button  type="submit" className="save-button" onClick={() =>{
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
                      axios
                      .post(
                        `${process.env.REACT_APP_URL}/changeFacultyUsername`,{newUsername:Name},config).then((response) => {
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
export default FacultyNModal;
