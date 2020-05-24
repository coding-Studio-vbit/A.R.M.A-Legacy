import React, { useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

const MessageModals = (props) => {
  const [show, setShow] = useState(false);
  let arr = props.arr;
  setShow(props.show);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {arr.map((msg) => {
            {
              <text>{msg}</text>;
            }
          })} */}
          {arr.map((msg) => (
            <Row className="show-grid">{msg}</Row>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MessageModals;
