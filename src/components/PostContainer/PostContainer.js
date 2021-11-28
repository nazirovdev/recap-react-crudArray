import React, { Component } from "react";
import "./PostContainer.css";

export default class PostContainer extends Component {
    render() {
        return <div className="container">{this.props.children}</div>;
    }
}
