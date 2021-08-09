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

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleChange2(event) {
    this.setState({ value2: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("//localhost:4250/postrestorant", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        Cookies.set("resad", res.data.ad);
        Cookies.set("id", res.data.id);
        this.props.history.push("/Restorantpanel");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 403) {
            swal({
              title: "E-mail veya Parola Hatası",
              text: "Restorant Kayıtlarda yok.",
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
    /*
    const response = axios.get("//localhost:4250/post");
    axios
      .get("//localhost:4250/post")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log("HATA");
      });

    this.setState({
      diziapi2: response.data,
    });*/
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
            className="aszx"
            style={{
              width: "500px",
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
                    <input id="remember" name="remember" type="checkbox" />{" "}
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
                <Link to="/Registerrestorant">Hala Kaydolmadın mı?</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
