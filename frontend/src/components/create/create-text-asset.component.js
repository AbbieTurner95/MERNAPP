import React, { Component } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class CreateTextAsset extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();

    this.onChangeAssetTitle = this.onChangeAssetTitle.bind(this);
    this.onChangeAssetAuthor = this.onChangeAssetAuthor.bind(this);
    this.onChangeAssetDescp = this.onChangeAssetDescp.bind(this);
    this.onChangeAssetDate = this.onChangeAssetDate.bind(this);
    this.onChangeAssetKeywords = this.onChangeAssetKeywords.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      asset_title: "",
      asset_author: "",
      asset_descp: "",
      asset_date: "",
      asset_keywords: "",
      type: "",
      asset_version: 1,
      isCheckedout: "false"
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
      console.log(`Form submitted:`);
      console.log(`Asset Title: ${this.state.asset_title}`);
      console.log(`Asset Author: ${this.state.asset_author}`);
      console.log(`Asset Date: ${this.state.asset_date}`);
      console.log(`Asset Keywords: ${this.state.asset_keywords}`);
      console.log(`Asset Descp: ${this.state.asset_descp}`);
      console.log(`Asset Version: ${this.state.asset_version}`);

      const newAsset = {
        asset_title: this.state.asset_title,
        asset_author: this.state.asset_author,
        asset_date: this.state.asset_date,
        asset_keywords: this.state.asset_keywords,
        asset_descp: this.state.asset_descp,
        isCheckedout: this.state.isCheckedout,
        asset_version: this.state.asset_version
      };

      axios
        .post("http://localhost:4000/assets/addText", newAsset)
        .then(alert("Text file Added Successfully!"));

      this.setState({
        asset_title: "",
        asset_author: "",
        asset_date: "",
        asset_descp: "",
        asset_keywords: "",
        asset_version: 1,
        isCheckedout: "false"
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
        style={{ paddingTop: 20, paddingBottom: 20 }}
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
            value="Create Text File"
            className="btn btn-primary"
          />
        </div>
      </form>
    );
  }
}
