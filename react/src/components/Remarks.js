import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from './Navi';
import axios from 'axios';
import '../css/Remarks.css';
class Remarks extends React.Component {
state={    Forum: 'Coding Studio',
   participants:['Name','Name1','Name2','Name3'],
   text:''
  
  }
  
handleInput(e){
  console.log(e.target.value)
  this.setState({
    text:e.target.value
  })
}
addRemark=(e)=>{
  e.preventDefault();
    const  payload= this.state.text;
  this.setState({
  text:''
 })
  axios({
    url:'http://localhost:8080/Remarks',
    method:'POST',
    data:payload
  })
    .then(() => {
      console.log('Data has been sent')
    })
    .catch(() =>
    {
      console.log("Error sending data")
    });
 }
 

render(){
    const list= this.state.participants.map(item=> {return(<li>{item}</li>)});
    return(
      <div>
      <Nav/>
      <div className="remarkbox">
        <Card className="bg-dark text-white">
  <center><Card.Header>Remarks</Card.Header></center>
  <Card.Body>
    <Card.Title className="color">{this.state.Forum}</Card.Title>
    <div className="color">{list}</div>

    <input  placeholder="Give your Remarks here" value={this.state.text} className="buttonremark" onChange={this.handleInput.bind(this)}></input>
    <center><Button variant="primary" className="buttonremark" onClick={this.addRemark}>Add Remark</Button></center>
  </Card.Body>
</Card>
</div>
</div>
    )}
}
export default Remarks;
