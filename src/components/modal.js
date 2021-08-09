import React, { Component } from "react";

export default class modal extends Component {
  render() {
    return (
      <div>
        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">...</div>
          </div>
        </div>
      </div>
    );
  }
}
