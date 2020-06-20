import React from "react";
import Template from "./Template";
import {
  Button,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Nav from "./Navi";
import AddTemplate from "./AddTemplate";

class TemplateList extends React.Component {
  state = {
    template: [
      {
        id: 1,
        subject: "Team attandance",
        recepient: "Pricipal",
        letter:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        linkName: "/TeamAttendance",
      },
      {
        id: 2,
        subject: "Event Conduct",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/conduct",
      },
      {
        id: 3,
        subject: "Campaigning",
        recepient: "Incharge",
        letter:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
        linkName: "/campaining",
      },
      {
        id: 1,
        subject: "Participants attandance",
        recepient: "Pricipal",
        letter:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        linkName: "/ParticipantsAttendance",
      },
      {
        id: 2,
        subject: "Event Venue",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/venue",
      },
      {
        id: 4,
        subject: "Conduct meet",
        recepient: "HOD",
        letter:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkName: "/conductmeet",
      },
    ],
    search: "",
  };
  updateSearch = (e) => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };
  render() {
    let fliteredTemplates = this.state.template.filter((temp) => {
      return (
        temp.subject.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (
      <React.Fragment class="body">
        <Nav />
        <div>
          <div class="box">
            <InputGroup className="mx-auto my-5 w-50 templateButton">
              <FormControl
                placeholder="Search a template "
                onChange={this.updateSearch}
                style={{ color: "grey", marginTop: "0", height: "50px" }}
                className="searchTemplate"
              />
              <InputGroup.Append>
                <Button
                  className="addtemp ml-3"
                  onClick={() => {
                    this.props.history.push("/Dashboard/AddTemplate");
                  }}
                >
                  Add Template
                </Button>
              </InputGroup.Append>
            </InputGroup>

            <Row>
              {fliteredTemplates.map((template) => (
                <Col xs={12} sm={12} md={6} lg={4} className="px-0">
                  <Template
                    key={template.id}
                    template={template}
                    linkName={template.linkName}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TemplateList;
