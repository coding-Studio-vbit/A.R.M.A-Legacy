import React from 'react';
import '../css/nav.css';
import {Link} from 'react-router-dom';
import {Nav,Navbar} from 'react-bootstrap';

export default function Navi() {
    return (
      <Navbar style={{backgroundColor: '#222222 !important', borderRadius:'5px'}} className="navigation" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">ARMA</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
    </Nav>
    <Nav>
<<<<<<< HEAD
      <Nav.Link style={{paddingBottom:'8.5px'}}><Link to="/Hdashboard/Profile">Profile</Link></Nav.Link>
      <Nav.Link style={{paddingBottom:'3px'}}>
=======
      <Nav.Link >Profile</Nav.Link>
      <Nav.Link >
>>>>>>> 3c5f6a7bca5c0a06ca14366a0e6542907aad9c6d
        Log out
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}
