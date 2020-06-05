import React from "react";
import { FormGroup, Form, Input, Label, ButtonToggle } from "reactstrap";
import axios from "axios";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const user = { username: this.state.username };
    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({ username: "" });
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>UserName:</Label>
            <Input
              type="text"
              required
              onChange={this.inputChangeHandler}
              value={this.state.username}
              name="username"
            />
            <br />
            <ButtonToggle type="submit" color="info">
              Send
            </ButtonToggle>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
