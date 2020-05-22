import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Container,Row,Col} from 'react-bootstrap';
import Nav from './Navi';
import axios from 'axios';
import '../css/Remarks.css';
const Remarks =() => {
  const [From, setFrom] = useState( 'Coding Studio')
  const [Participants, setPeople] = useState([])
  const [Select, setSelect] = useState([])
  const [Text, setText] = useState({text:''})
  useEffect(()=>{
    let Participants=[{
      name:'Name',
      roll:'123444',
      check:false
    },
    {
     name:'Name1',
     roll:'123321',
     check:false
   },
   {
     name:'Name2',
     roll:'123244',
     check:false
   },
   {
     name:'Name3',
     roll:'123443',
     check:false
   },
   {
     name:'Name4',
     roll:'129443',
     check:false
   },
   {
    name:'Name5',
    roll:'122444',
    check:false
  },
  {  name:'Name6',
    roll:'123476',
    check:false
  },
  {
   name:'Name7',
   roll:'134244',
   check:false
  },
  {
   name:'Name8',
   roll:'126244',
   check:false
  }
    ];
    setPeople(
      Participants.map(d =>{
        return{
          name:d.name,
          roll:d.roll,
          check:d.check
        }
      }));
  },[]);
const handleInput=(e)=>{
  console.log(e.target.value)
 setText({
    text:e.target.value
  })
}
const addRemark=(sel,rej)=>{
  console.log(sel);
  
    const  payload= { remark:Text.text,
      selected: sel,
      rejected:rej
    }
  setText({
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
 const Selected=()=>{
  const sel=Participants.filter(data => data.check==true);
  const rej=Participants.filter(data => data.check==false);
  addRemark(sel,rej);

 }


  var count=1;
  const list= Participants.map(item=> {
  
  return(
  <tr>
    <td>{count++}</td>
    <td>{item.name}</td>
    <td>{item.roll}</td>
    <td><input  onChange={event =>{
      
        let checked=event.target.checked;
        
        setPeople(
          Participants.map(data=>{
            if(item.roll===data.roll){
              data.check=checked;
            }
            return data;
          })
        )
      
        
      }}type="checkbox" id="Approve" name="App" checked={item.check} ></input></td>
    {/* <td><input type="checkbox" id={Id1} name={Name}  ></input></td> */}
    </tr>
    )});
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
    <Row><textarea value={Text.text} onChange={handleInput} cols={80} rows={6} placeholder="Enter your Remarks here..."/></Row>
    <Button className='Rebtn' variant="primary" onClick={Selected}>Send Remarks</Button>
   
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
      <th>Approve<input onChange={event =>{
      
      let checked=event.target.checked;
      setPeople(
        Participants.map(data=>{
         
            data.check=checked;
          
          return data;
        })
      )
      
    }} type="checkbox" id='Approve' name='App'  ></input></th>
      {/* <th>Reject<input type="checkbox" id='Reject' name='rej'  ></input></th> */}
      
    </tr>
  </thead>  <tbody>
    {list}</tbody></Table>
    </Row></div>
    {/* <div className="Buttoncell">
    <Row>
      <Col><Button variant="primary" size="sm" >Approve All</Button></Col>
      <Col><Button variant="primary" size="sm">Reject All</Button></Col>
    </Row></div> */}
    <div className="Buttons">
    <Row>
      <Col><Button variant="success" siz="lg" onClick={Selected}>Approve</Button></Col>
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

export default Remarks;
