import React from "react";
import "./css/table.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

class Table extends React.Component {
  /*approval = (id) =>{
    this.setState({data: this.state.data.map(temp => {
      if(temp.id===id){
        temp.approved = !temp.approved
        if(temp.approved) temp.status = 'Approved';
        else temp.status = 'pending';
      }
      return temp;
    }) });
  }*/
  state = {
    persons: [],
    modalShow: false,
    id: "",
  };

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios
      .get(`${process.env.REACT_APP_URL}/forumdashboard`, config)
      .then((res) => {
        const persons = res.data;
        this.setState({ persons });
        console.log(persons);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.id);
    var i = 1;
    const items = this.state.persons.map((item) => {
      return (
        <tr className="tableTR">
          <td className="tableTD" style={{ color: "#b007c4" }}>
            {i++}
          </td>
          <td className="tableTD">{item.subject}</td>
          <td className="tableTD">{item.status}</td>
          <td className="tableTD">
            <a
              href="/ViewStatus"
              onClick={() => {
                localStorage.setItem("req_id", item.request_id);
              }}
            >
              Click me!
            </a>
          </td>
          <td className="tableTD" style={{ cursor: "pointer", color: "grey" }}>
            <Link
              to={{
                pathname: "/Dashboard/EditCreateRequest",
                req_id: item.request_id,
              }}
            >
              <i class="far fa-edit"></i>
            </Link>
          </td>
          <td className="tableTD" style={{ cursor: "pointer", color: "grey" }}>
            <Link>
              <i
                class="far fa-trash-alt"
                onClick={() =>
                  this.setState({ modalShow: true, id: item.request_id })
                }
              ></i>
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <div class="containerz">
        <div class="container table-container">
          <div class="table-responsive">
            <table class="table">
              <thead className="tablehead">
                <tr className="tableTR">
                  <th className="tableTH" scope="col">
                    #
                  </th>
                  <th className="tableTH" scope="col">
                    Subject
                  </th>
                  <th className="tableTH" scope="col" style={{ width: "10%" }}>
                    Status
                  </th>
                  <th className="tableTH" scope="col">
                    Remarks
                  </th>
                  <th className="tableTH" scope="col" style={{ width: "5%" }}>
                    Edit
                  </th>
                  <th className="tableTH" scope="col" style={{ width: "5%" }}>
                    Delete
                  </th>
                  {
                    // <th scope="col"><center>Approve</center></th>
                  }
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        </div>
        <ConfirmDelete
          id={this.state.id}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
      </div>
    );
  }
}

export default Table;
