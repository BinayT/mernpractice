import React from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, ButtonToggle } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      duration: 0,
      description: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((el) => el.username),
          username: res.data[0].username,
        });
      }
    });
  }

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  dateChangeHandler = (date) => {
    this.setState({ date: date });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise.username);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create a New Exercise Log</h3>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <select
              ref="userInput"
              required
              name="username"
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
              placeholder="Description"
              onChange={this.inputChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Duration</Label>
            <Input
              type="number"
              name="duration"
              placeholder="Duration(minutes)"
              onChange={this.inputChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.dateChangeHandler}
              />
            </div>
          </FormGroup>
          <ButtonToggle type="submit" color="info">
            Submit
          </ButtonToggle>
        </Form>
      </div>
    );
  }
}

export default CreateExercise;
