import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "../Auth/css/Form.css";
import "../Auth/css/Modal.css";

const ConfirmDelete = (props) => {
  const Delete = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      let userName = user.userName;
      let accessToken = user.accessToken;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          request_id: props.id,
        },
      };
      console.log(config);
      axios
        .delete(`${process.env.REACT_APP_URL}/createrequest`, config)
        .then((response) => {
          console.log("Deleted");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="container modal-bg">
        <div className="row w-100 text-center" style={{ color: "white" }}>
          <h3 className="mx-auto mb-5 text-center">
            Are you sure you want to delete?
          </h3>
        </div>
        <div className="row">
          <div className="col-md mb-5">
            <button type="button" class="btn btn-danger w-100" onClick={Delete}>
              Yes
            </button>
          </div>
          <div className="col-md">
            <button
              type="button"
              class="btn btn-primary w-100"
              onClick={() => {
                window.location.reload();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
