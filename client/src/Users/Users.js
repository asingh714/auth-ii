import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .get(endpoint, requestOptions)
      .then(response => {
        this.setState({
          users: response.data.users
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h2>List of Users:</h2>
        {this.state.users.map(user => (
          <div key={user.id} className="box">
            <p>Username: {user.username}</p>
            <p>Department: {user.department}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Users;
