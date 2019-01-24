import React, { Component } from 'react';
import {NavLink, Route} from "react-router-dom";
import './App.css';

import Home from "./Home/Home";


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
            <div class="logout-btn">Log Out</div>
        </nav>

        <main>
          <Route exact to="/" component={Home}/>
        </main>
        </header>
      </div>
    );
  }
}

export default App;
