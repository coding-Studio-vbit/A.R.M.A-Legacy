import React, { Component } from 'react';
import { Card,Nav,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Fnavi extends Component {
    render() {
        return (
            <div className="align-self-center mb-0 justify-content-betweeen">
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Link to="/fdashboard/"><Button>Request permission</Button></Link>
      </Nav.Item>
      <Nav.Item>
      <Link to="/fdashboard/Submission"><Button>Show Status</Button></Link>
      </Nav.Item>
    </Nav>
  </Card.Header>

            </div>
        )
    }
}
