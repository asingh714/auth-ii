import React, { Component } from 'react';
import {NavLink, Route} from "react-router-dom";
import './App.css';

import Home from "./Home/Home";
import Users from "./Users/Users";
import SignIn from "./SignIn/SignIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
          <NavLink exact to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/users">Users</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/signin">Sign In</NavLink>
            <div className="logout-btn">Log Out</div>
        </nav>

        <main>
          <Route exact path="/" component={Home}/>
          <Route path="/users" component={Users}/>
          <Route path="/signin" component={SignIn}/>
          
        </main>
        </header>
      </div>
    );
  }
}

export default App;
