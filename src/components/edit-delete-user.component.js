import React from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";

export default class EditUser extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  };

  render() {
    const userList = this.state.users.map((el) => {
      return (
        <tr>
          <td key={el._id}>{el.username}</td>
          <td>
            <Button color="danger" onClick={() => this.deleteExercise(el._id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </Table>
    );
  }
}
