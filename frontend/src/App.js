import React, { Component } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/Images/logo.png";

import Login from "./LogIn/login.js";
import AssetsList from "./components/asstes-list.components.js";
import CreateAsset from "./components/create/create-asset.component";

import PictureVersion from "./components/asset-picture-versions.component";
import VideoVersion from "./components/asset-video-versions.component";
import TextVersion from "./components/asset-text-versions.component";

import PictureEdit from "./components/edit/edit-picture-component";
import TextEdit from "./components/edit/edit-text-component";
import VideoEdit from "./components/edit/edit-video-component";

import DeletePicture from "./components/delete/delete-picture-asset.component";
import DeleteText from "./components/delete/delete-text-asset.component";
import DeleteVideo from "./components/delete/delete-video-asset.component";

import RestrictedRoute from "./RouteTypes/RestrictedRoute";
import UnrestrictedRoute from "./RouteTypes/UnrestrictedRoute";
import AdminRestrictedRoute from "./RouteTypes/AdminRestrictedRoute";

import { getFromStorage } from "./LogIn/utils/storage.js";

import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    const obj = getFromStorage("tms_app");
    let isLoggedIn = obj && obj.token ? true : false;
    this.state = {
      isLoggedIn: isLoggedIn,
      user: isLoggedIn ? obj.user : null
    };

    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  handleUserAuthentication = status => {
    this.setState({
      isLoggedIn: status
    });
  };

  setCurrentUser = user => {
    this.setState({
      user: user
    });
  };

  handleLogout = e => {
    let obj = getFromStorage("tms_app");
    if (obj && obj.token) {
      Axios.post("http://localhost:4000/auth/logout", {
        token: obj.token
      });
    }

    this.handleUserAuthentication(false);
    localStorage.removeItem("tms_app");
  };

  render() {
    const cProps = {
      isLoggedIn: this.state.isLoggedIn,
      handleUserAuthentication: this.handleUserAuthentication,
      setCurrentUser: this.setCurrentUser,
      currentUser: this.state.user
    };

    return (
      <div className="my-container">
        <div className="my-nav-bar">
          <nav className="navbar navbar-expand-lg bg-dark">
            <a className="navbar-brand" target="_blank">
              <img alt="logo img" src={logo} width="50" height="50" />
            </a>

            <h1
              className="navbar-brand"
              style={{ color: "#ffffff", margin: "10px" }}
            >
              TMS File Library <i className="fas fa-desktop" />{" "}
            </h1>

            <div className="collpase navbar-collapse">
              <ul className="navbar-nav white mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Files
                  </Link>
                </li>

                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    {" "}
                    Upload Files
                  </Link>
                </li>

                {this.state.isLoggedIn ? (
                  <li className="navbar-item">
                    <a
                      className="nav-link"
                      style={{ color: "white" }}
                      onClick={this.handleLogout}
                    >
                      Log Out
                    </a>
                  </li>
                ) : (
                  <li className="navbar-item">
                    <Link to="/signin" className="nav-link" />
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>

        <div className="my-content">
          <UnrestrictedRoute
            path="/signin"
            exact
            component={Login}
            props={cProps}
          />

          <RestrictedRoute
            path="/"
            exact
            component={AssetsList}
            props={cProps}
          />

          <AdminRestrictedRoute
            path="/picture/edit/:id"
            component={PictureEdit}
            props={cProps}
          />

          <AdminRestrictedRoute
            path="/text/edit/:id"
            component={TextEdit}
            props={cProps}
          />

          <AdminRestrictedRoute
            path="/video/edit/:id"
            component={VideoEdit}
            props={cProps}
          />

          <RestrictedRoute
            path="/picture/versions/:id"
            component={PictureVersion}
            props={cProps}
          />

          <RestrictedRoute
            path="/text/versions/:id"
            component={TextVersion}
            props={cProps}
          />

          <RestrictedRoute
            path="/video/versions/:id"
            component={VideoVersion}
            props={cProps}
          />

          <AdminRestrictedRoute
            path="/picture/delete/:id"
            component={DeletePicture}
            props={cProps}
          />
          <AdminRestrictedRoute
            path="/text/delete/:id"
            component={DeleteText}
            props={cProps}
          />
          <AdminRestrictedRoute
            path="/video/delete/:id"
            component={DeleteVideo}
            props={cProps}
          />
          <RestrictedRoute
            path="/create"
            component={CreateAsset}
            props={cProps}
          />
        </div>
      </div>
    );
  }
}

export default App;
