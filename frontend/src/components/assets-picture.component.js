import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./assets.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Asset = props => (
  <tr>
    <td>{props.asset.asset_title}</td>
    <td>{props.asset.asset_author}</td>
    <td>{props.asset.asset_descp}</td>
    <td>{props.asset.asset_size}</td>
    <td>{props.asset.asset_date}</td>
    <td>{props.asset.asset_keywords}</td>

    <td>
      <Link to={"picture/versions/" + props.asset._id}>
        <FontAwesomeIcon icon={faDesktop} {...props} />
      </Link>
    </td>

    <td>
      <Link to={"picture/edit/" + props.asset._id}>
        <FontAwesomeIcon icon={faEdit} />
      </Link>
    </td>

    {props.user && props.user.isAdmin ? (
      <td>
        <Link to={"picture/delete/" + props.asset._id}>
          <FontAwesomeIcon icon={faTrash} />
        </Link>
      </td>
    ) : (
      <></>
    )}
  </tr>
);

export default class assetPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      data: "",
      type: "title"
    };

    this.onSearchDataChange = this.onSearchDataChange.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onSubmitCancel = this.onSubmitCancel.bind(this);
    this.onChangeAssetType = this.onChangeAssetType.bind(this);
    this.assetList = this.assetList.bind(this);
  }

  onSearchDataChange = e => {
    this.setState({
      data: e.target.value
    });
  };

  onSubmitSearch = () => {
    if (this.state.type === "title") {
      axios
        .get(
          "http://localhost:4000/assets/searchPictureTitleQuery/" +
            this.state.data
        )
        .then(res => {
          this.setState({ assets: res.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (this.state.type === "keywords") {
      axios
        .get(
          "http://localhost:4000/assets/searchPictureKeywordsQuery/" +
            this.state.data
        )
        .then(res => {
          this.setState({ assets: res.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (this.state.type === "author") {
      axios
        .get(
          "http://localhost:4000/assets/searchPictureAuthorQuery/" +
            this.state.data
        )
        .then(res => {
          this.setState({ assets: res.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  onSubmitCancel = () => {
    axios
      .get("http://localhost:4000/assets/picture")
      .then(response => {
        console.log(response.data);
        this.setState({ assets: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/assets/picture")
      .then(response => {
        console.log(response.data);
        this.setState({ assets: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  assetList = () => {
    let html = [];
    this.state.assets.forEach((currentAsset, i) => {
      html.push(
        <Asset asset={currentAsset} user={this.props.currentUser} key={i} />
      );
    });
    return html;
  };

  onChangeAssetType(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    return (
      <div className="noMargin">
        <div className="searchbox noMargin in-line">
          <input
            type="text"
            className="input"
            placeholder="Search Picture Files ..."
            onChange={this.onSearchDataChange}
          />

          <div className="Margin styled-select black rounded noMargin">
            <select onChange={this.onChangeAssetType}>
              <option value="title">Title</option>
              <option value="keywords">Keywords</option>
              <option value="author">Author</option>
            </select>
          </div>

          <button className="Button" onClick={this.onSubmitSearch}>
            <FontAwesomeIcon className="Purple" icon={faSearch} />
          </button>

          <button className="Button MarginLeft" onClick={this.onSubmitCancel}>
            <FontAwesomeIcon className="Purple" icon={faTimesCircle} />
          </button>
        </div>

        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Size</th>
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
          <tbody>{this.assetList()}</tbody>
        </table>
      </div>
    );
  }
}
