import React, { Component } from "react";

export default class button extends Component {
  render() {
    return (
      <div id="iptaletbuton">
        <button
          disabled={this.props.disable}
          data-durum={this.props.datadurum}
          data-id={this.props.dataid}
          onClick={this.props.func}
          className="hover:bg-blue-600 py-2 px-4 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}
