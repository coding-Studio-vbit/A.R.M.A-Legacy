<<<<<<< HEAD
import React from 'react'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
=======
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from './Navi';
>>>>>>> 3b53d069da70a7bea1b97815d46e1662ed02f332
import '../css/Remarks.css';
class Remarks extends React.Component {
state={    Forum: 'Coding Studio',
   participants:['Name','Name1','Name2','Name3']
}

render(){
    const list= this.state.participants.map(item=> {return(<li>{item}</li>)});
    return(
<<<<<<< HEAD
=======
      <div>
      <Nav/>
      <div className="remarkbox">
>>>>>>> 3b53d069da70a7bea1b97815d46e1662ed02f332
        <Card className="bg-dark text-white">
  <center><Card.Header>Remarks</Card.Header></center>
  <Card.Body>
    <Card.Title className="color">{this.state.Forum}</Card.Title>
    <div className="color">{list}</div>
<<<<<<< HEAD
    <input  placeholder="Remarks...."></input>
    <center><Button variant="primary">Add Remark</Button></center>
  </Card.Body>
</Card>
=======

    <input  placeholder="Give your Remarks here" className="buttonremark"></input>
    <center><Button variant="primary" className="buttonremark">Add Remark</Button></center>
  </Card.Body>
</Card>
</div>
</div>
>>>>>>> 3b53d069da70a7bea1b97815d46e1662ed02f332
    )}
}
export default Remarks;
