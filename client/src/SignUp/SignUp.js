import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSignUp = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    axios
      .post(endpoint, this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.props.history.push("/users");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSignUp} className="box login">
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder="Password"
          />
          <input
            name="department"
            type="text"
            value={this.state.department}
            onChange={this.handleInputChange}
            placeholder="Department"
          />
          <button className="submit-btn">Log in</button>
        </form>
      </>
    );
  }
}

export default SignUp;
