import React, { Component } from "react";
import { NavLink, Route, withRouter } from "react-router-dom";
import "./App.css";

import Users from "./Users/Users";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";


class App extends Component {

  handleSignOut = () => {
    localStorage.removeItem("token")
    this.props.history.push("/signin")
  }

  render() {
    return (
      <>
        <nav>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/users">Users</NavLink>
          <button onClick={this.handleSignOut}>Sign Out</button>
        </nav>
        <main>
          <Route path="/users" component={Users} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </main>
      </>
    );
  }
}

export default withRouter(App);
