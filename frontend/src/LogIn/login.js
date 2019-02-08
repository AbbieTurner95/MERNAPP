import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { setInStorage } from "../LogIn/utils/storage.js";

import "./login.css";
import Axios from "axios";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onSignIn = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });

    let data = {
      email: this.state.email,
      password: this.state.password
    };

    Axios.post("http://localhost:4000/auth/signin", data).then(res => {
      if (res.data.success) {
        setInStorage("tms_app", { token: res.data.token, user: res.data.user });
        this.props.handleUserAuthentication(true);
        this.props.setCurrentUser(res.data.user);
      } else {
        alert(res.data.message);
      }
    });
  };

  render() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/");
      return (
        <div>
          <button onClick={this.logout}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input
                type="email"
                id="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
              />

              <input
                type="password"
                placeholder="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <button onClick={this.onSignIn}>Log In</button>
            </form>
          </div>
        </div>
      );
    }
  }
}
