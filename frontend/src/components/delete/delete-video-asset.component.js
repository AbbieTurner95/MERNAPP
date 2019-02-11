import React, { Component } from "react";
import axios from "axios";
import "../../components/assets.css";
import delete_pic from "../../Images/delete.png";

export default class deleteVideoAsset extends Component {
  delete() {
    axios
      .delete(
        "http://localhost:4000/assets/video/delete/" +
          this.props.match.params.id
      )
      .then(alert("Video File Deleted Successfully!"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="middle">
        <h3> Are you sure you want to Delete this Video File?</h3>
        <img
          alt="delete img"
          src={delete_pic}
          width="100"
          height="100"
          style={{ marginBottom: "20px" }}
        />
        <button onClick={this.delete.bind(this)} className="btn btn-danger">
          Delete Video File
        </button>
      </div>
    );
  }
}
