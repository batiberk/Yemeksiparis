import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
export default class Uyeprofil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: "",
      soyad: "",
      mail: "",
      telefon: "",
      adres: "",
    };
    this.getid = this.getid.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  componentDidMount() {
    axios
      .post("//localhost:4250/uyebilgi", { id: Cookies.get("uyeid") })
      .then((res) => {
        this.setState({
          ad: res.data.ad,
          soyad: res.data.soyad,
          mail: res.data.mail,
          telefon: res.data.telefon,
          adres: res.data.adres,
        });
      })
      .catch((err) => {
        console.log("iSTEK atILAMADI");
      });
  }

  async getid() {
    await swal({
      title: "Profil Güncellendi",
      text: "Yeniden Giriş Yapınız..",
      icon: "success",
      timer: 2000,
      buttons: false,
    });
    axios
      .post("//localhost:4250/uyeguncelle", {
        id: Cookies.get("uyeid"),
        ad: this.state.ad,
        mail: this.state.mail,
        soyad: this.state.soyad,
        telefon: this.state.telefon,
        adres: this.state.adres,
      })
      .then((res) => {
        // console.log("123123");

        Cookies.remove("userId");
        Cookies.remove("uyeid");
        window.location.href = "/Login";
      })
      .catch((err) => {
        // console.log("321321");
        swal({
          title: "Kaydedilemedi",
          text: "HATA",
          icon: "error",
          timer: 2000,
          buttons: false,
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <form className="form-group">
            <label>Ad</label>
            <input
              className="form-control"
              value={this.state.ad}
              onChange={this.onChangeHandle("ad")}
            />
            <label>Soyad</label>
            <input
              className="form-control"
              value={this.state.soyad}
              onChange={this.onChangeHandle("soyad")}
            />

            <label>E-mail</label>
            <input
              className="form-control"
              value={this.state.mail}
              onChange={this.onChangeHandle("mail")}
            />
            <label>Telefon</label>
            <input
              className="form-control"
              value={this.state.telefon}
              onChange={this.onChangeHandle("telefon")}
            />
            <label>Adres</label>
            <input
              className="form-control"
              value={this.state.adres}
              onChange={this.onChangeHandle("adres")}
            />
          </form>
          <button
            onClick={this.getid}
            type="button"
            className="py-2 px-4 bg-red-700 hover:bg-green-900  text-white font-semibold rounded-lg shadow-md transform transition motion-reduce:transform-none hover:scale-110 duration-500 focus:outline-none"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    );
  }
}
