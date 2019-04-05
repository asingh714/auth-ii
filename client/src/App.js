import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";

import Home from "./Home/Home";
import Users from "./Users/Users";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

class App extends Component {
  signout = () => {
    localStorage.removeItem("jwt");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to="/">
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            <button className="logout-btn" onClick={this.signout}>
              Log Out
            </button>
          </nav>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
