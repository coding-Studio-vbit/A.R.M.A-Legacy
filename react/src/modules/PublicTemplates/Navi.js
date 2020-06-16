import React from "react";
import "./css/nav.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Navi = () => {
  return (
    <Navbar
      style={{ backgroundColor: "#222222 !important", borderRadius: "5px" }}
      className="navigation"
      id="page-top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand style={{color:"#C60CD5",textShadow: "0.5px 0.5px 2px #C60CD5"}} href="#home">ARMA</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/">
            <i class="fas fa-home"></i>Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navi;
