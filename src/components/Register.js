import axios from "axios";
import React, { Component } from "react";
import cors from "cors";
import swal from "sweetalert";
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad: "",
      soyad: "",
      telefon: "",
      mail: "",
      sifre: "",
      parola2: "",
    };
    this.handleChangead = this.handleChangead.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  handleChangead(event) {
    this.setState({ temp: event.target.value });
  }
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.sifre != this.state.parola2) {
      swal({
        title: "PAROLA UYUŞMUYOR",
        text: "Redirecting...",
        icon: "warning",
        timer: 20000,
        buttons: false,
      });
    } else {
      axios
        .post("//localhost:4250/register", {
          ad: this.state.ad,
          soyad: this.state.soyad,
          mail: this.state.mail,
          telefon: this.state.telefon,
          sifre: this.state.sifre,
        })
        .then((res) => {
          swal({
            title: "Kaydınız Başarıyla Oluşturuldu",
            text: "Giriş Sayfasına Yönlendiriliyorsunuz..",
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        })
        .catch((error) => {});

      axios
        .post("//localhost:4250/users", this.state.temp)
        .then((data) => {})
        .catch((err) => {
          console.log(err + "HATA");
        });

      this.props.history.push("/Login");

      //   Cookies.set('asdasdsa', 'valuasdase', { expires: 7, path:'http://localhost:3000/' });
    }
  }

  submit_Form() {}
  render() {
    return (
      <div>
        <div className="fulldiv">
          <div className="login-card 2">
            <div className="login-glass 2">
              <img></img>
            </div>
            <div
              style={{ overflowY: "scroll" }}
              className="login-form-container 2"
            >
              <h3 className="login-title">KAYIT OL</h3>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label for="ad">Ad</label>
                  <input
                    className="form-control"
                    value={this.state.ad}
                    onChange={this.onChangeHandle("ad")}
                    required
                  />
                  <label for="soyad">Soyad</label>
                  <input
                    className="form-control"
                    value={this.state.soyad}
                    onChange={this.onChangeHandle("soyad")}
                    /*onChange={this.handleChangesoyad}*/
                    required
                  />
                  <label for="telefon">Telefon</label>
                  <input
                    className="form-control"
                    value={this.state.telefon}
                    onChange={this.onChangeHandle("telefon")}
                    required
                  />
                  <label for="email">E-mail</label>
                  <input
                    className="form-control"
                    value={this.state.mail}
                    onChange={this.onChangeHandle("mail")}
                    required
                  />
                  <label for="password">Parola</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    value={this.state.sifre}
                    onChange={this.onChangeHandle("sifre")}
                    type="password"
                    required
                  />
                  <label for="password">Parola(tekrar)</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    value={this.state.parola2}
                    onChange={this.onChangeHandle("parola2")}
                    type="password"
                    required
                  />
                </div>
                <br />

                <div className="buttondiv">
                  <button
                    type="submit"
                    className="buttonlogin py-2 px-3 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none"
                    tabIndex="-1"
                  >
                    Kayıt Ol
                  </button>
                  <br />
                </div>
              </form>
              <a href="" className="divider">
                {" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
