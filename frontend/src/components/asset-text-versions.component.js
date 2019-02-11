import React, { Component } from "react";
import "./assets.css";
import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-solid-svg-icons";

export default class TextVersion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      data: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/assets/text/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({ assets: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="noMargin">
        <div className="MarginTop in-line">
          <FontAwesomeIcon className="Margin Purple" icon={faImages} />
          <h3>
            <b>
              <u>Text : {this.state.assets.asset_title} </u>
            </b>
          </h3>
        </div>

        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Keywords</th>
              <th scope="col">Versions</th>

              {this.state.assets.isCheckedout ? (
                <></>
              ) : (
                <th scope="col">Edit</th>
              )}

              {this.props.currentUser && this.props.currentUser.isAdmin ? (
                <th scope="col"> Delete</th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}
