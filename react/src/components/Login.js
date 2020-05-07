import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("Select a forum");

  const stutt = () => {
    const data = { password };
    axios
      .post("/hashpassword", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const isEnabled = password.length > 0;
  return (
    <div className="mine">
      <h1> Login </h1>
      <div style={{ marginTop: 20 }}></div>
      <Dropdown>
        <Dropdown.Toggle>{value}</Dropdown.Toggle>
        <Dropdown.Menu>
          {["codingStudio", "stumagz", "IEEE-Vbit", "RoboticsClub"].map(
            (club) => (
              <Dropdown.Item onSelect={() => setValue(club)}>
                {club}
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ marginTop: 20 }}></div>
      <Form>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            size="lg"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button
          disabled={!isEnabled}
          className="btn btn-primary"
          onClick={stutt}
        >
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
