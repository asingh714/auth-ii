import React from "react";
import axios from "axios";

import requiresAuth from "../auth/requiresAuth";

class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    const endpoint = "http://localhost:5000/api/users";

    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .get(endpoint, requestOptions)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h2>List of Users:</h2>
        {this.state.users.map(user => (
          <div key={user.id}>
            <p>Username: {user.username}</p>
            <p>Department: {user.department}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Users;
