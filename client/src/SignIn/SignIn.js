import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSignIn = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

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
        <h2>Sign In</h2>
        <form onSubmit={this.handleSignIn} className="box login">
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
          <button className="submit-btn">Log in</button>
        </form>
      </>
    );
  }
}

export default SignIn;
