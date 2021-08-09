import axios from "axios";
import React, { Component } from "react";
import cors from "cors";
import swal from "sweetalert";
import slugify from "react-slugify";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad: "",
      mintutar: "",
      telefon: "",
      mail: "",
      sifre: "",
      parola2: "",
      slug: "",
    };
    // this.handleChangead = this.handleChangead.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  // handleChangead(event) {
  //   this.setState({ temp: event.target.value });
  // }
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
      var slug2 = slugify(document.getElementById("inputad").value);
      this.setState({ slug: slug2 });
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.sifre != this.state.parola2) {
      swal({
        icon: "warning",
        timer: 2000,
        buttons: false,
      });
    } else {
      axios
        .post("//localhost:4250/registerrestorant", {
          ad: this.state.ad,
          mintutar: this.state.mintutar,
          mail: this.state.mail,
          telefon: this.state.telefon,
          sifre: this.state.sifre,
          slug: this.state.slug,
        })
        .then((res) => {})
        .catch((error) => {});
      var xa = this.state.ad;
      alert(
        this.state.slug
        // "--" +
        // this.state.soyad +
        // "--" +
        // this.state.telefon +
        // "--" +
        // this.state.mail +
        // "--" +
        // this.state.parola +
        // "--" +
        // this.state.parola2
      );

      axios
        .post("//localhost:4250/users", this.state.temp)
        .then((data) => {})
        .catch((err) => {
          console.log(err + "HATA");
        });
      swal({
        title: "Kaydınız Başarıyla Oluşturuldu",
        text: "Giriş Sayfasına Yönlendiriliyorsunuz..",
        icon: "success",
        timer: 2000,
        buttons: false,
      });
      this.props.history.push("/Loginrestorant");

      //   Cookies.set('asdasdsa', 'valuasdase', { expires: 7, path:'http://localhost:3000/' });
    }
  }

  submit_Form() {}
  render() {
    return (
      <div>
        <div className="fulldiv">
          <div className="login-card">
            <div className="login-glass">
              <img></img>
            </div>
            <div className="login-form-container">
              <h3 className="login-title">KAYIT OL</h3>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label for="ad">Restorant Adı</label>
                  <input
                    id="inputad"
                    className="form-control"
                    value={this.state.ad}
                    onChange={this.onChangeHandle("ad")}
                    required
                  />
                  <label for="mintutar">Minimum Paket Tutarı</label>
                  <input
                    className="form-control"
                    value={this.state.mintutar}
                    onChange={this.onChangeHandle("mintutar")}
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
