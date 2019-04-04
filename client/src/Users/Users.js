import React from "react";
import axios from "axios";

class Users extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <>  
        <h2>List of Users:</h2>
        {this.state.users.map(user => (
          <div key={user.id}>
            <p>Username: {user.username}</p>
            <p>Department: {user.department}</p>
          </div>
        ))}
      </>
    )
  }
}

export default Users;