import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, InputGroup ,FormControl } from "react-bootstrap";
import Nav from "./Navi";
import axios from "axios";
import "./css/Remarks.css";
const ViewStatus = (props) => {
  const status = "Accepted";
  const [From, setFrom] = useState("Coding Studio");
  const [Search, setSearch] = useState("");
  const [Req_data, setReq_data] = useState({});
  const [Participants, setPeople] = useState([
    { name: "No Name Yet", roll: "No Roll Number Yet", check: true },
  ]);
  const [Subject, setSubject] = useState("");
  const [Status, setStatus] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Description, setDescription] = useState("");
  const [Facility, setFacility] = useState([
    { facility: "No Facility Yet", check: true },
  ]);
  const [Text, setText] = useState("Hrlrgdghisku");
  const [PartTable, setTable] = useState(true);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    // console.log(props.location.Rprops.id)
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        request_id: JSON.parse(localStorage.getItem("req_id")),
      },
    };
    console.log(config);
    axios
      .get(`${process.env.REACT_APP_URL}/getrequest`, config)
      .then((res) => {
        var data = res.data[0];
        setFrom(data.forum_name);
        setSubject(data.request_data.subject);
        setReq_data(data.request_data);
        setDescription(data.request_data.description);
        setPeople(data.request_data.selected_participants);
        setFacility(data.request_data.selected_facilities);
        setStatus(data.status);
        setRemarks(data.remarks);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleInput = (e) => {
    console.log(e.target.value);
    setText({
      text: e.target.value,
    });
  };
  const chgTable = () => {
    setTable(false);
  };
  const chTable = () => {
    setTable(true);
  };

  var count = 1;
  var f_count = 1;
  const fliteredParticipants = Participants.filter(
    (participant) => {
      return (participant.name.toLowerCase().includes(Search.toLowerCase()))||(participant.roll.toLowerCase().includes(Search.toLowerCase()));
    }
  );
  const list = fliteredParticipants.map((item) => {
    return (
      <tr>
        <td>{count++}</td>
        <td>{item.name}</td>
        <td>{item.roll}</td>
      </tr>
    );
  });
  const list1 = Facility.map((item) => {
    return (
      <tr>
        <td>{f_count++}</td>
        <td>{item.facility}</td>
      </tr>
    );
  });
  return (
    <div>
      <Nav />
      <div Classname="Con">
        <Container>
          <center>
            <h1>Letter Info</h1>
          </center>
          <Row>
            <Col>
              <Row>
                <h3>
                  <span>From :</span>
                  {From}
                </h3>
              </Row>
              <Row>
                <h3>
                  <span>Subject : </span>
                  {Subject}
                </h3>
              </Row>
              <Row>
                <h5>
                  <span>Description : </span>
                  {Description}
                </h5>
              </Row>
              <Row>
                <h3>
                  <span>Remarks : </span>
                  {Remarks}
                </h3>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <i
                    class="fas fa-chevron-circle-left"
                    style={{ cursor: "pointer", color: "grey" }}
                    onClick={chTable}
                  ></i>
                </Col>
                <Col style={{ padding: "0px" }}>
                  <center>
                    {PartTable ? <h4>Participants</h4> : <h4>Facilities</h4>}
                  </center>
                </Col>
                <Col>
                  <i
                    class="fas fa-chevron-circle-right"
                    style={{ cursor: "pointer", color: "grey" }}
                    onClick={chgTable}
                  ></i>
                </Col>
              </Row>
              {PartTable? (<Row>
              <InputGroup className="mx-auto w-75">
                  <FormControl
                    placeholder="Search by name or roll number"
                    onChange={updateSearch}
                    style={{color:"grey"}}
                  />
                </InputGroup>
              </Row>):(<Row></Row>)}
              <div className="Table">
                <Row>
                  {PartTable ? (
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Roll No</th>
                        </tr>
                      </thead>{" "}
                      <tbody>{list}</tbody>
                    </Table>
                  ) : (
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Facilities</th>
                        </tr>
                      </thead>{" "}
                      <tbody>{list1}</tbody>
                    </Table>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ViewStatus;
