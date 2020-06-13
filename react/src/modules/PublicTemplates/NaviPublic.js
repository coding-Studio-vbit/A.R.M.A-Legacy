import React from "react";
import "../../css/nav.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NaviPublic = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    if (user !== null) {
      let accessToken = user.accessToken;
      console.log(user.userName);
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      console.log(config);
      axios
        .post(`${process.env.REACT_APP_URL}/logout`, user, config)
        .then((response) => {
          console.log(response);
          localStorage.clear();
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (user !== null)
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
        <Navbar.Brand href="#home">ARMA</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav>
            

            <Nav.Link onClick={handleLogout} style={{float: "end"}}>
              <i class="fas fa-sign-out-alt"></i>Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
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
          <Nav.Link href="/login">
            <i class="fas fa-home"></i>Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NaviPublic;
