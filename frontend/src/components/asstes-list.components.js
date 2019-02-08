import React, { Component } from "react";
import PictureAsset from "./assets-picture.component";
import TextAsset from "./assets-text.component";
import VideoAsset from "./assets-video.component";
import "./assets.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default class AssetsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="noMargin">
        <div className="MarginTop in-line">
          <FontAwesomeIcon className="Margin Purple" icon={faImages} />
          <h3>
            <u>Picture Files</u>{" "}
          </h3>
        </div>
        <PictureAsset {...this.props} />

        <div className="MarginTop in-line">
          <FontAwesomeIcon className="Margin Purple" icon={faTextHeight} />
          <h3>
            <u>Text Files</u>
          </h3>
        </div>
        <TextAsset {...this.props} />

        <div className="MarginTop in-line">
          <FontAwesomeIcon className="Margin Purple" icon={faVideo} />
          <h3>
            <u>Video Files</u>
          </h3>
        </div>
        <VideoAsset {...this.props} />
      </div>
    );
  }
}
