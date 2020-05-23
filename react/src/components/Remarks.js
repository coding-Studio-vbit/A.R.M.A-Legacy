import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Container,Row,Col} from 'react-bootstrap';
import Nav from './Navi';
import axios from 'axios';
import '../css/Remarks.css';
class Remarks extends React.Component {
state={    Forum: 'Coding Studio',
   participants:[{
     name:'Name',
     roll:'123444'
   },
   {
    name:'Name1',
    roll:'123321'
  },
  {
    name:'Name2',
    roll:'123244'
  },
  {
    name:'Name3',
    roll:'123443'
  },
  {
    name:'Name4',
    roll:'123443'
  },
  {
   name:'Name5',
   roll:'122444'
 },
 {
   name:'Name6',
   roll:'123476'
 },
 {
  name:'Name7',
  roll:'134244'
},
{
  name:'Name8',
  roll:'123244'
}
   ],
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
  var count=1;
  const list= this.state.participants.map(item=> {return(<tr><td>{count++}</td><td>{item.name}</td>
      <td>{item.roll}</td></tr>)});
    return(
      <div>
      <Nav/>
      <div Classname="Con">
      <Container>
        <center><h1>Letter Info</h1></center>
  <Row>
    <Col>
    <Row><h3><span>From :</span> CodingStudio();</h3></Row>
    <Row><h3><span>Subject : </span>Permission for codecraft</h3></Row>
    <Row><h5><span>Description : </span>"Lorem ipsum dolor sit amet, cosed do eiusmod tempor incididunt ut labore eti ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h5></Row>
    <label>Remarks : </label>
    <Row><textarea value={this.state.text} onChange={this.handleInput.bind(this)} cols={80} rows={6} placeholder="Enter your Remarks here..."/></Row>
    </Col>
    
    <Col>
    <center><h4>Participants</h4></center><div className="Table">
    <Row >
    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Roll No</th>
      
    </tr>
  </thead>  <tbody>
    {list}</tbody></Table>
    </Row></div>
    <div className="Buttons">
    <Row>
      <Col><Button variant="success">Approve</Button></Col>
      <Col><Button variant="danger">Reject</Button></Col>
    </Row>
    </div>
    </Col>
    
    
    
  </Row>
</Container></div>
     {/*  <div className="remarkbox">
        <Card className="bg-dark text-white">
  <center><Card.Header>Remarks</Card.Header></center>
  <Card.Body>
    <Card.Title className="color">{this.state.Forum}</Card.Title>
    <div className="color">{list}</div>

    <input  placeholder="Give your Remarks here" value={this.state.text} className="buttonremark" onChange={this.handleInput.bind(this)}></input>
    <center><Button variant="primary" className="buttonremark" onClick={this.addRemark}>Add Remark</Button></center>
  </Card.Body>
</Card>
</div> */}
</div>
    )}
}
export default Remarks;
