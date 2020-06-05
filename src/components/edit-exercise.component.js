import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { FormGroup, Label, Form, Input, ButtonToggle } from "reactstrap";

export default class EditExercise extends React.Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDateChange = (date) => {
    this.setState({ date: date });
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          username: res.data.username,
        });
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({ users: res.data.map((el) => el.username) });
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    axios
      .patch(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Edit the Exercise of {this.state.username}</h3>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <select
              ref="userInput"
              required
              name="username"
              value={this.state.username}
              className="form-control"
              onChange={this.inputChangeHandler}
            >
              {this.state.users.map((el, key) => (
                <option key={key} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              required
              type="text"
              name="description"
              value={this.state.description}
              placeholder="Description"
              onChange={this.inputChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Duration</Label>
            <Input
              type="number"
              name="duration"
              value={this.state.duration}
              placeholder="Duration(minutes)"
              onChange={this.inputChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <div>
              <DatePicker
                value={this.state.date}
                selected={this.state.date}
                onChange={this.dateChangeHandler}
              />
            </div>
          </FormGroup>
          <ButtonToggle type="submit" color="primary">
            Update
          </ButtonToggle>
        </Form>
      </div>
    );
  }
}
