import React from 'react'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/Remarks.css';
class Remarks extends React.Component {
state={    Forum: 'Coding Studio',
   participants:['Name','Name1','Name2','Name3']
}

render(){
    const list= this.state.participants.map(item=> {return(<li>{item}</li>)});
    return(
        <Card className="bg-dark text-white">
  <center><Card.Header>Remarks</Card.Header></center>
  <Card.Body>
    <Card.Title className="color">{this.state.Forum}</Card.Title>
    <div className="color">{list}</div>
    <input  placeholder="Remarks...."></input>
    <center><Button variant="primary">Add Remark</Button></center>
  </Card.Body>
</Card>
    )}
}
export default Remarks;
