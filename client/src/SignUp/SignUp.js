import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSignUp = event => {
    event.preventDefault();

    const endpoint = "http://localhost:5000/api/register";

    axios
      .post(endpoint, this.state)
      .then(response => {
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
        console.log(error);
      });

    this.props.history.push("/users");
  };

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSignUp}>
          <input
            name="username"
            onChange={this.handleInputChange}
            placeholder="Username"
            type="text"
            value={this.state.username}
          />
          <input
            name="password"
            onChange={this.handleInputChange}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <input
            name="department"
            onChange={this.handleInputChange}
            placeholder="Department"
            type="text"
            value={this.state.department}
          />
          <button>Sign Up</button>
        </form>
      </>
    );
  }
}

export default SignUp;
