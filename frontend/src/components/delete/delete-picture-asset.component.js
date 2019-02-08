import React, { Component } from "react";
import axios from "axios";
import "../../components/assets.css";
import delete_pic from "../../images/delete.png";

export default class deletePictureAsset extends Component {
  delete() {
    axios
      .delete(
        "http://localhost:4000/assets/picture/delete/" +
          this.props.match.params.id
      )
      .then(alert("Picture File Deleted Successfully!"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="middle">
        <h3> Are you sure you want to Delete this Picture?</h3>
        <img
          alt="delete img"
          src={delete_pic}
          width="100"
          height="100"
          style={{ marginBottom: "20px" }}
        />
        <button onClick={this.delete.bind(this)} className="btn btn-danger">
          Delete Picture File
        </button>
      </div>
    );
  }
}
