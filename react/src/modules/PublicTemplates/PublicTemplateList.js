import React from "react";
import Template from "../Dashboard/Template";
import {
  Button,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Nav from "./Navi";

class Templates extends React.Component {
  state = {
    template: [
      {
        id: 1,
        subject: "Period Attendance",
        recepient: "Pricipal",
        letter:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        linkName: "/tlist/PeriodAttendancePermission",
      },
      {
        id: 2,
        subject: "Acknowledge Absence Permission",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/tlist/AcknowledgeAbsencePermission",
      },
      {
        id: 3,
        subject: "Leave",
        recepient: "Incharge",
        letter:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
        linkName: "/tlist/LeavePermission",
      },
      {
        id: 1,
        subject: "Late to class",
        recepient: "Pricipal",
        letter:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        linkName: "/tlist/LateToClassPermission",
      },
      {
        id: 2,
        subject: "Late Record submission",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/tlist/LateRecordPermission",
      },
      {
        id: 4,
        subject: "Late Fee Permission",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/tlist/LateFeePermission",
      },
      {
        id: 1,
        subject: "Hostel Leave Permission",
        recepient: "Pricipal",
        letter:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        linkName: "/tlist/HostelLeavePermission",
      },
      {
        id: 2,
        subject: "Halfday Leave Permission",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/tlist/HalfDayLeave",
      },
      {
        id: 4,
        subject: "Allowance for lab exam",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/tlist/AllowanceLabExam",
      },
    ],
    search: "",
  };

  updateSearch = (e) => {
    this.setState({ search: e.target.value });
  };
  render() {
    let fliteredTemplates = this.state.template.filter((template) => {
      return (
        template.subject
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <React.Fragment>
        <Nav/>
        <InputGroup className="mx-auto my-5 w-50">
          <FormControl
            placeholder="Search a template "
            onChange={this.updateSearch}
            style={{ color: "grey" }}
          />
          {/*<InputGroup.Append>
                  <Button variant="outline-secondary" className="my-auto"><i class="fa fa-search" aria-hidden="true"></i></Button>
                </InputGroup.Append>*/}
        </InputGroup>
        <div>
          <Container>
            <Row>
              {fliteredTemplates.map((template) => (
                <Col xs={12} sm={12} md={6} lg={4}>
                  <Template
                    key={template.id}
                    template={template}
                    linkName={template.linkName}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Templates;
