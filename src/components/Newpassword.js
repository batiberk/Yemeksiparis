import swal from "@sweetalert/with-react";
import React, { Component } from "react";
import axios from "axios";
import Uyetip from "./Uyetip";

export default class Newpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.mail,
      newpassword: "",
      newpassword2: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.newpassword != this.state.newpassword2) {
      swal("PAROLA UYUŞMUYOR");
    } else {
      await axios
        .post("//localhost:4250/sifredegistir", {
          mail: this.state.mail,
          newpassword: this.state.newpassword,
        })
        .then((res) => {
          if ((res.data = true)) {
            swal("Şifreniz başarıyla değiştirildi ");
            window.location.href = "/";
            window.location.hash = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              placeholder="Yeni şifrenizi girin"
              style={{ marginBottom: "10px" }}
              className="form-control"
              value={this.state.newpassword}
              onChange={this.onChangeHandle("newpassword")}
              required
            />
            <input
              className="form-control"
              placeholder="Şifre(Tekrar)"
              value={this.state.newpassword2}
              onChange={this.onChangeHandle("newpassword2")}
              required
            />
          </div>
          <br />
          <div className="buttondiv" style={{ justifyContent: "center" }}>
            <button
              type="submit"
              className="py-2 px-3 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none"
              tabIndex="-1"
            >
              Parolayı değiştir
            </button>
            <br />
          </div>
        </form>
      </div>
    );
  }
}
