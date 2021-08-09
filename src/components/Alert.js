import React, { Component } from "react";

export default class Alert extends Component {
  render() {
    return (
      <div id="alert" className="alertbox d-none ">
        <div>
          <button className="closebutton" onClick={this.props.func}>
            X
          </button>
          <p> {this.props.text}</p>
        </div>
      </div>
    );
  }
}
