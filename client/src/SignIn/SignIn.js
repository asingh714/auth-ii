import React from "react";
import axios from "axios";

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSignIn = event => {
    event.preventDefault();
    const endpoint = "http://localhost:5000/api/login";
    axios.post(endpoint, this.state)
    .then(response => {
      localStorage.setItem("token", response.data.token)
    })
    .catch(error => {
      console.log(error);
    })
    this.props.history.push("/users")
  }

  render() {
    return (
      <>
      <h2>Sign In</h2>
      <form onSubmit={this.handleSignIn}>
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
        <button>Log in</button>
      </form>
    </>
    )
  }
}

export default SignIn;