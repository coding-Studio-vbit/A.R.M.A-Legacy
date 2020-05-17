import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from './Navi';
import '../css/Remarks.css';
class Remarks extends React.Component {
state={    Forum: 'Coding Studio',
   participants:['Name','Name1','Name2','Name3']
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

    <input  placeholder="Give your Remarks here" className="buttonremark"></input>
    <center><Button variant="primary" className="buttonremark">Add Remark</Button></center>
  </Card.Body>
</Card>
</div>
</div>
    )}
}
export default Remarks;
