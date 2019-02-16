import React, { Component } from "react";
import "./assets.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

export default class VideoVersion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/assets/video/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          asset: response.data,
          isCheckedout: response.data.isCheckedout,
          isCheckedoutBy: response.data.isCheckedoutBy
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.asset != null) {
      return (
        <div className="noMargin">
          <div className="MarginTop in-line">
            <FontAwesomeIcon className="Margin Purple" icon={faImages} />
            <h3>
              <b>
                <u>
                  Video File : {this.state.asset.newest_version.asset_title}{" "}
                </u>
              </b>
            </h3>
          </div>

          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Description</th>
                <th scope="col">Size</th>
                <th scope="col">Length</th>
                <th scope="col">Date</th>
                <th scope="col">Keywords</th>
                <th scope="col">Versions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.asset.all_versions.map((asset, index) => {
                return (
                  <tr>
                    <td>{asset.asset_title}</td>
                    <td>{asset.asset_author}</td>
                    <td>{asset.asset_descp}</td>
                    <td>{asset.asset_size}</td>
                    <td>{asset.asset_length}</td>
                    <td>{asset.asset_date}</td>
                    <td>{asset.asset_keywords}</td>
                    <td>{index}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div>Loading data</div>;
    }
  }
}
