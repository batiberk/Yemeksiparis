import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      value2: "",
      diziapi: [],
      login: "",
      email: "",
      password: "",
      diziapi2: [],
      data: [],
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  //   axios
  //     .get("//localhost:4250/login")
  //     .then((res) => {
  //       this.setState({
  //         diziapi: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("HATA");
  //     });
  // }
  handleChange2(event) {
    this.setState({ value2: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await axios
      .post("//localhost:4250/post", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        var x = res.data.ad + " " + res.data.soyad;
        this.setState({ email: "", password: "" });
        Cookies.set("uyeid", res.data.id);
        Cookies.set("uyead", x);
        this.props.history.push("/Restaurantlist");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status == 403) {
            swal({
              title: "Kullanıcı Adı veya Parola Hatası",
              text: "Müşterilerimizde böyle bir kayıt bulanamadı",
              icon: "warning",
              timer: 2000,
              buttons: false,
            });
          } else {
            swal({
              title: "SUNUCU HATASI",
              icon: "warning",
              timer: 2000,
              buttons: false,
            });
          }
        }
      });
  }

  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  render() {
    return (
      <div>
        <div className="fulldiv">
          <div
            className="aszx col-md-5"
            style={{
              borderRadius: "5%",
            }}
          >
            <div className="" style={{ width: "60%" }}>
              <img></img>
            </div>
            <div
              style={{
                padding: "50px",
                background: "white",
                borderRadius: "5%",
              }}
              className="container diva"
            >
              <h3 className="login-title">{this.props.giris}</h3>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label for="email">E-mail</label>
                  <input
                    id="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeHandle("email")}
                    required
                  />
                </div>
                <br />

                <div>
                  <label for="password">Parola</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandle("password")}
                    type="password"
                    required
                  />
                </div>
                <div>
                  <div>
                    <input id="rememberMe" name="remember" type="checkbox" />{" "}
                    <label for="remember">Beni Hatırla</label>
                  </div>
                </div>
                <div className="buttondiv">
                  <button
                    type="submit"
                    className="buttonlogin py-2 px-3 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none"
                    tabIndex="-1"
                  >
                    Giriş Yap
                  </button>
                  <br />
                </div>
                <div>
                  <Link to="Forgetpassword">Şifreni mi Unuttun</Link>
                </div>
              </form>
              <a href="" className="divider">
                {" "}
                <Link to="Register">Hala Kaydolmadın mı?</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
