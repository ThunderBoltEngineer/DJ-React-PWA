import React, {Component} from "react";

import Album from "src/resources/images/main/album.png";

export default class Image extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      console.log('load failed');
      if (this.props.fallbackSrc) {
        this.setState({ failed: true });
      }
    };
  }

  render() {
    if (this.state.failed) {
      return <img src={Album} />;
    } else {
      return <img className="img-responsive" src={this.props.src} onError={this.fallback} />;
    }
  }
}