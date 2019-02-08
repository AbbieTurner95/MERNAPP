import React, { Component } from "react";
import PictureAsset from "./create-pictures-asset.component";
import TextAsset from "./create-text-asset.component";
import VideoAsset from "./create-video-asset.component";
import "../../components/assets.css";

export default class CreateAsset extends Component {
  constructor(props) {
    super(props);

    this.changeAssetType = this.changeAssetType.bind(this);

    this.state = {
      type: "picture"
    };
  }

  changeAssetType(e) {
    this.setState({ type: e.target.value });
  }

  displayAssetType() {
    if (this.state.type === "picture") {
      return <PictureAsset />;
    } else if (this.state.type === "text") {
      return <TextAsset />;
    } else if (this.state.type === "video") {
      return <VideoAsset />;
    }
  }

  render() {
    return (
      <div className="typeForm">
        <h3> Upload new Asset </h3>

        <div class="styled-select black rounded noMargin">
          <select onChange={this.changeAssetType}>
            <option value="picture">Picture</option>
            <option value="text">Text</option>
            <option value="video">Video</option>
          </select>
        </div>

        {this.displayAssetType()}
      </div>
    );
  }
}
