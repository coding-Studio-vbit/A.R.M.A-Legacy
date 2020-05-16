import React from 'react';
import '../css/nav.css';
import {Link} from 'react-router-dom';
import {Nav,Navbar} from 'react-bootstrap';

export default function Navi() {
    return (
      <Navbar style={{backgroundColor: '#222222 !important',paddingBottom:0,paddingTop:'5px', borderRadius:'5px'}} className="navigation" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home" style={{color:'grey'}}>ARMA</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link style={{backgroundColor: '#1a1a1a', paddingBottom:'-5px',color:'white'}}>Dashboard</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link style={{paddingBottom:'8.5px'}}><Link to="/Hdashboard/Profile">Profile</Link></Nav.Link>
      <Nav.Link style={{paddingBottom:'3px'}}>
        Log out
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}
