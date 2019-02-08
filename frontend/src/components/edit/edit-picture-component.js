import React, { Component } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import "../../components/assets.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

export default class EditPicture extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();

    this.onChangeAssetTitle = this.onChangeAssetTitle.bind(this);
    this.onChangeAssetAuthor = this.onChangeAssetAuthor.bind(this);
    this.onChangeAssetDate = this.onChangeAssetDate.bind(this);
    this.onChangeAssetKeywords = this.onChangeAssetKeywords.bind(this);
    this.onChangeAssetSize = this.onChangeAssetSize.bind(this);
    this.onChangeAssetDescp = this.onChangeAssetDescp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayForm = this.displayForm.bind(this);

    this.state = {
      asset_title: "",
      asset_author: "",
      asset_size: "",
      asset_descp: "",
      asset_date: "",
      asset_keywords: "",
      isCheckout: "",
      isCheckedoutBy: "",
      type: ""
    };
  }

  componentDidMount() {
    let checkOutModel = {
      userId: this.props.currentUser._id,
      fileId: this.props.match.params.id
    };

    axios
      .put("http://localhost:4000/assets/picture/checkout", checkOutModel)
      .then(response => {
        this.setState({
          asset_title: response.data.asset_title,
          asset_author: response.data.asset_author,
          asset_size: response.data.asset_size,
          asset_descp: response.data.asset_descp,
          asset_date: response.data.asset_date,
          asset_keywords: response.data.asset_keywords,
          isCheckout: response.data.isCheckout,
          isCheckedoutBy: response.data.isCheckedoutBy
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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

  onChangeAssetSize(e) {
    this.setState({
      asset_size: e.target.value
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
      const obj = {
        _id: this.props.match.params.id,
        asset_title: this.state.asset_title,
        asset_author: this.state.asset_author,
        asset_size: this.state.asset_size,
        asset_descp: this.state.asset_descp,
        asset_date: this.state.asset_date,
        asset_keywords: this.state.asset_keywords,
        isCheckout: false,
        isCheckedoutBy: null
      };
      axios
        .post("http://localhost:4000/assets/picture/edit/", obj)
        .then(alert("Picture File Updated Successfully!"))
        .catch(err => {});
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  displayForm() {
    if (
      this.state.isCheckout &&
      this.state.isCheckedoutBy === this.props.currentUser._id
    ) {
      return (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset_title}
              onChange={this.onChangeAssetTitle}
            />
          </div>

          <div className="form-group">
            <label>Author : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset_author}
              onChange={this.onChangeAssetAuthor}
            />
            {this.validator.message(
              "author",
              this.state.asset_title,
              "alpha_space)"
            )}
          </div>

          <div className="form-group">
            <label>Size : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset_size}
              onChange={this.onChangeAssetSize}
            />
          </div>

          <div className="form-group">
            <label>Description : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset_descp}
              onChange={this.onChangeAssetDescp}
            />
          </div>

          <div className="form-group">
            <label>Date : (YYMMDD) </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset_date}
              onChange={this.onChangeAssetDate}
            />
          </div>

          <div className="form-group">
            <label>Keywords : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.asset_keywords}
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
              value="Update Picture"
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
          Update Picture
        </h3>

        {this.displayForm()}
      </div>
    );
  }
}
