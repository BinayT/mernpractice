import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Button color="warning">
        <Link to={"/edit/" + props.exercise._id}>Edit</Link>
      </Button>{" "}
      |{" "}
      <Button
        color="danger"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

export default class ExerciseList extends React.Component {
  state = {
    exercises: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  };

  exerciseList = () => {
    return this.state.exercises.map((el) => {
      return (
        <Exercise
          exercise={el}
          deleteExercise={this.deleteExercise}
          key={el._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </Table>
      </div>
    );
  }
}
