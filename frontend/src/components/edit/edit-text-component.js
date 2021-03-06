import React, { Component } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import "../../components/assets.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

export default class EditText extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();

    this.onChangeAssetTitle = this.onChangeAssetTitle.bind(this);
    this.onChangeAssetAuthor = this.onChangeAssetAuthor.bind(this);
    this.onChangeAssetDate = this.onChangeAssetDate.bind(this);
    this.onChangeAssetKeywords = this.onChangeAssetKeywords.bind(this);
    this.onChangeAssetDescp = this.onChangeAssetDescp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayForm = this.displayForm.bind(this);

    this.state = {
      asset: "",
      isCheckedout: "",
      isCheckedoutBy: null
    };
  }

  componentDidMount() {
    let checkOutModel = {
      userId: this.props.currentUser._id,
      fileId: this.props.match.params.id
    };

    axios
      .put("http://localhost:4000/assets/text/checkout", checkOutModel)
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

  onChangeAssetTitle(e) {
    let asset_title = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      asset: {
        ...prevState.asset,
        newest_version: {
          ...prevState.asset.newest_version,
          asset_title: asset_title
        }
      }
    }));
  }

  onChangeAssetAuthor(e) {
    let asset_author = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      asset: {
        ...prevState.asset,
        newest_version: {
          ...prevState.asset.newest_version,
          asset_author: asset_author
        }
      }
    }));
  }

  onChangeAssetDescp(e) {
    let asset_descp = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      asset: {
        ...prevState.asset,
        newest_version: {
          ...prevState.asset.newest_version,
          asset_descp: asset_descp
        }
      }
    }));
  }

  onChangeAssetKeywords(e) {
    let asset_keywords = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      asset: {
        ...prevState.asset,
        newest_version: {
          ...prevState.asset.newest_version,
          asset_keywords: asset_keywords
        }
      }
    }));
  }

  onChangeAssetDate(e) {
    let asset_date = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      asset: {
        ...prevState.asset,
        newest_version: {
          ...prevState.asset.newest_version,
          asset_date: asset_date
        }
      }
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let obj = this.state.asset;
      obj.isCheckedout = "false";
      obj.isCheckedoutBy = null;
      obj.all_versions.push(obj.newest_version);

      axios
        .post("http://localhost:4000/assets/text/edit/", obj)
        .then(alert("Text File Updated Successfully!"))
        .catch(err => {});
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  displayForm() {
    if (
      this.state.isCheckedout &&
      this.state.isCheckedoutBy === this.props.currentUser._id
    ) {
      return (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset.newest_version.asset_title}
              onChange={this.onChangeAssetTitle}
            />
          </div>

          <div className="form-group">
            <label>Author : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset.newest_version.asset_author}
              onChange={this.onChangeAssetAuthor}
            />
            {this.validator.message(
              "author",
              this.state.asset_title,
              "alpha_space"
            )}
          </div>

          <div className="form-group">
            <label>Description : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset.newest_version.asset_descp}
              onChange={this.onChangeAssetDescp}
            />
          </div>

          <div className="form-group">
            <label>Date : (YYMMDD) </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset.newest_version.asset_date}
              onChange={this.onChangeAssetDate}
            />
          </div>

          <div className="form-group">
            <label>Keywords : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset.newest_version.asset_keywords}
              onChange={this.onChangeAssetKeywords}
            />
            {this.validator.message(
              "keywords",
              this.state.asset_keywords,
              "alpha_num_space"
            )}
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Text"
              className="btn btn-primary"
            />
          </div>
        </form>
      );
    } else {
      return <div>EDIT IN PROGRESS BY OTHER USER</div>;
    }
  }

  render() {
    return (
      <div>
        <h3 className="Purple Pad10">
          <FontAwesomeIcon className="MarginRight" icon={faPenSquare} />
          Update Text File
        </h3>

        {this.displayForm()}
      </div>
    );
  }
}
