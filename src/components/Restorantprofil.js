import axios from "axios";
import Cookies from "js-cookie";
import React, { Component } from "react";
import Navbar from "./Navbar";
import swal from "sweetalert";

export default class Restorantprofil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ad: "",
      mintutar: "",
      telefon: "",
      email: "",
      image: "",
      image_file: "",
      image_preview: "",
      image_name: "",
    };
    this.getid = this.getid.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleImagePreview = this.handleImagePreview.bind(this);
  }

  componentDidMount() {
    axios
      .post("//localhost:4250/urungetir", { id: Cookies.get("id") })
      .then((res) => {
        //console.log(res.data);
        this.setState({
          ad: res.data[0].restorantadi,
          mintutar: res.data[0].mintutar,
          telefon: res.data[0].telefon,
          email: res.data[0].email,
          image: res.data[0].logo,
        });
        //console.log(Cookies.get("id"));
      })
      .catch((err) => {
        console.log("HATA");
      });

    console.log(this.state.data);
  }
  async getid() {
    var formData = new FormData();
    if (this.state.image_file != "") {
      formData.append("file", this.state.image_file);
      await axios
        .post("//localhost:4250/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // this.setState({ filename: res.data.filename });
          // console.log("123123");
          this.setState({ image_name: res.data.filename });
        })
        .catch();
    }

    await axios
      .post("//localhost:4250/restorantguncelle", {
        id: Cookies.get("id"),
        restorantadi: this.state.ad,
        email: this.state.email,
        mintutar: this.state.mintutar,
        telefon: this.state.telefon,
        image: this.state.image_name,
      })
      .then((res) => {
        // console.log("123123");

        swal({
          title: "Profil Güncellendi",
          text: "Kaydediliyor...",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
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
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  async handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append("file", this.state.image_file);
    axios
      .post("//localhost:4250/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log("123123");
      })
      .catch();
  }
  handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];

    this.setState({
      image_preview: image_as_base64,
      image_file: image_as_files,
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <form className="form-group">
            <label>Restorant Adı</label>
            <input
              className="form-control"
              value={this.state.ad}
              onChange={this.onChangeHandle("ad")}
            />
            <label>İletişim Numarası</label>
            <input
              className="form-control"
              value={this.state.telefon}
              onChange={this.onChangeHandle("telefon")}
            />

            <label>E-mail</label>
            <input
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeHandle("email")}
              // value={this.state.data[0].telefon}
            />
            <label>Minimum Paket Tutarı</label>
            <input
              className="form-control"
              value={this.state.mintutar}
              onChange={this.onChangeHandle("mintutar")}
            />

            <label>Restorant Logosu</label>
            <input
              onChange={this.handleImagePreview}
              name="file"
              style={{ border: "none", width: "350px" }}
              type="file"
              className="form-control"
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
