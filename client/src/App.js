import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";

import Users from "./Users/Users";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";


class App extends Component {
  render() {
    return (
      <>
        <nav>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/users">Users</NavLink>
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

export default App;
