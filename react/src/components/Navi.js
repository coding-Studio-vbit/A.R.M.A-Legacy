import React from 'react';
import '../css/nav.css';
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
      <Nav.Link >Profile</Nav.Link>
      <Nav.Link >
        Log out
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}
