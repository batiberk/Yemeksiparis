import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../cheflogo.jpg";
import logo2 from "../userlogo.png";
import Cookies from "js-cookie";

export default class Uyetip extends Component {
  constructor(props) {
    super(props);

    this.musterigiris = this.musterigiris.bind(this);
    this.restorantgiris = this.restorantgiris.bind(this);
  }
  musterigiris() {
    if (Cookies.get("uyeid")) {
      this.props.history.push("/Restaurantlist");
    } else {
      this.props.history.push("/Login");
    }
  }
  restorantgiris() {
    if (Cookies.get("id")) {
      this.props.history.push("/Restorantpanel");
    } else {
      this.props.history.push("/Loginrestorant");
    }
  }

  render() {
    return (
      <div className="secimdiv row">
        <div className="restorantgiris">
          <button onClick={this.restorantgiris} className="butonlogo">
            <img className="img" src={logo} style={{ borderRadius: "7%" }} />
          </button>
        </div>
        <div className="musterigiris">
          <button onClick={this.musterigiris} className="butonlogo">
            <img className="img" src={logo2} style={{ borderRadius: "7%" }} />
          </button>
        </div>
      </div>
    );
  }
}
