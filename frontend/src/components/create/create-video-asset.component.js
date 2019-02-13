import React, { Component } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class CreateVideoAsset extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();

    this.onChangeAssetTitle = this.onChangeAssetTitle.bind(this);
    this.onChangeAssetAuthor = this.onChangeAssetAuthor.bind(this);
    this.onChangeAssetDate = this.onChangeAssetDate.bind(this);
    this.onChangeAssetKeywords = this.onChangeAssetKeywords.bind(this);
    this.onChangeAssetSize = this.onChangeAssetSize.bind(this);
    this.onChangeAssetDescp = this.onChangeAssetDescp.bind(this);
    this.onChangeAssetSize = this.onChangeAssetSize.bind(this);
    this.onChangeAssetLength = this.onChangeAssetLength.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isCheckedout: "false",

      newest_version: {
        asset_title: "",
        asset_author: "",
        asset_date: "",
        asset_keywords: "",
        asset_descp: "",
        asset_size: "",
        asset_length: "",
        asset_version: "",
        edited_at: "",
        edited_by: ""
      },

      all_versions: [
        {
          asset_title: "",
          asset_author: "",
          asset_date: "",
          asset_keywords: "",
          asset_descp: "",
          asset_size: "",
          asset_length: "",
          asset_version: "",
          edited_at: "",
          edited_by: ""
        }
      ]
    };
  }

  onChangeAssetTitle(e) {
    this.setState({
      asset_title: e.target.value
    });
  }

  onChangeAssetAuthor(e) {
    this.setState({
      asset_author: e.target.value
    });
  }

  onChangeAssetDescp(e) {
    this.setState({
      asset_descp: e.target.value
    });
  }

  onChangeAssetSize(e) {
    this.setState({
      asset_size: e.target.value
    });
  }

  onChangeAssetLength(e) {
    this.setState({
      asset_length: e.target.value
    });
  }

  onChangeAssetDate(e) {
    this.setState({
      asset_date: e.target.value
    });
  }

  onChangeAssetKeywords(e) {
    this.setState({
      asset_keywords: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const newAsset = {
        file: {
          isCheckedout: this.state.isCheckedout,

          newest_version: {
            asset_title: this.state.asset_title,
            asset_author: this.state.asset_author,
            asset_date: this.state.asset_date,
            asset_keywords: this.state.asset_keywords,
            asset_descp: this.state.asset_descp,
            asset_size: this.state.asset_size,
            asset_length: this.state.asset_length,
            asset_version: this.state.asset_version,
            edited_at: this.state.edited_at,
            edited_by: this.state.edited_by
          },

          all_versions: [
            {
              asset_title: this.state.asset_title,
              asset_author: this.state.asset_author,
              asset_date: this.state.asset_date,
              asset_keywords: this.state.asset_keywords,
              asset_descp: this.state.asset_descp,
              asset_size: this.state.asset_size,
              asset_length: this.state.asset_length,
              asset_version: this.state.asset_version,
              edited_at: this.state.edited_at,
              edited_by: this.state.edited_by
            }
          ]
        }
      };

      axios
        .post("http://localhost:4000/assets/addVideo", newAsset.file)
        .then(res => {
          alert("Video file Added Successfully!");
          this.state = {
            isCheckedout: "false",

            newest_version: {
              asset_title: "",
              asset_author: "",
              asset_date: "",
              asset_keywords: "",
              asset_descp: "",
              asset_size: "",
              asset_length: "",
              asset_version: "",
              edited_at: "",
              edited_by: ""
            }
          };
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        style={{ paddingTop: 20, paddingBottom: 90 }}
      >
        <div className="form-group noMargin">
          <label>Title: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_title}
            onChange={this.onChangeAssetTitle}
          />

          {this.validator.message("title", this.state.asset_title, "required")}
        </div>
        <div className="form-group noMargin">
          <label>Author: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_author}
            onChange={this.onChangeAssetAuthor}
          />
          {this.validator.message(
            "author",
            this.state.asset_author,
            "required|alpha_space"
          )}
        </div>

        <div className="form-group noMargin">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_descp}
            onChange={this.onChangeAssetDescp}
          />
          {this.validator.message(
            "description",
            this.state.asset_descp,
            "required"
          )}
        </div>

        <div className="form-group noMargin">
          <label>Size: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_size}
            onChange={this.onChangeAssetSize}
          />
          {this.validator.message(
            "size",
            this.state.asset_size,
            "required|alpha_num_space"
          )}
        </div>

        <div className="form-group noMargin">
          <label>Length: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_length}
            onChange={this.onChangeAssetLength}
          />
        </div>

        <div className="form-group noMargin">
          <label>Date: (YYMMDD) </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_date}
            onChange={this.onChangeAssetDate}
          />
          {this.validator.message(
            "date",
            this.state.asset_date,
            "required|numeric"
          )}
        </div>

        <div className="form-group noMargin">
          <label>Keywords: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.asset_keywords}
            onChange={this.onChangeAssetKeywords}
          />
          {this.validator.message(
            "keywords",
            this.state.asset_keywords,
            "required|alpha_num_space"
          )}
        </div>

        <div
          className="form-group noMargin"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          <input
            type="submit"
            value="Create Video File"
            className="btn btn-primary"
          />
        </div>
      </form>
    );
  }
}
