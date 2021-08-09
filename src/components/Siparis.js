import React, { Component } from "react";
import Alert from "./Alert";
import Homepage from "./Homepage";
import Navbar from "./Navbar";

export default class Siparis extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount(){
  //     console.log("Son ziyaret edilen", window.localStorage.getItem("istedigim"));
  // }
  render() {
    return (
      <div>
        <Navbar loginname="OSMAN" />
        <Homepage slug={this.props.match.params.id} />
        {/*app.js de belirlenen /url/:id ye ulaşma*/}
      </div>
    );
  }
}
