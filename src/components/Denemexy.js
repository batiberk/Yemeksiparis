import React, { Component } from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import Deneme2 from "./Deneme2";
import axios from "axios";
import Cookies from "js-cookie";
export default class Uyesiparislerim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 0,
      tempsiparis: [],
      adsoyad: "",
      telefon: "",
      adres: "",
      siparisdetay: [],
      teslimdurum: "",
      onaydurum: "",
      hazirlanmadurum: "",
      yoldadurum: "",
      filtre: [0, 1, 2, 3],
    };
    this.detaylar = this.detaylar.bind(this);
  }
  componentDidMount() {
    axios
      .post("//localhost:4250/uyesiparislerim/", {
        uyeid: Cookies.get("uyeid"),
      })
      .then((res) => {
        console.log(res.data.ad);
        this.setState({
          tempsiparis: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  close() {
    this.setState({ visible: 0 });
  }

  detaylar(e) {
    axios
      .post("//localhost:4250/uyesiparislerimdetay/", {
        uyeid: Cookies.get("uyeid"),
        id: e.target.dataset.id,
      })
      .then((res) => {
        console.log(res.data[0]);
        this.setState({
          siparisdetay: res.data,
          adsoyad: res.data[0].ad + " " + res.data[0].soyad,
          telefon: res.data[0].telefon,
          adres: res.data[0].adres,
          tutar: res.data[0].tutar,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ visible: 1 });
    console.log(this.state.siparisdetay);
  }
  tesliminput(e) {
    e.target.setAttribute("checked", "false");
    var dizi = [];

    if (e.target.checked == true) {
      e.target.setAttribute("checked", "true");
      document.querySelectorAll("input[checked=true]").forEach((item) => {
        dizi.push(item.dataset.durum);
      });
      this.setState({ filtre: dizi });
    } else if (e.target.checked == false) {
      dizi = this.state.filtre;
      var arr = dizi.filter(function (item) {
        return item != e.target.dataset.durum;
      });
      console.log(arr);
      this.setState({ filtre: arr });
      if (document.querySelectorAll("input[checked=true]").length == 0) {
        this.setState({ filtre: [0, 1, 2, 3] });
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Deneme2
          adsoyad={this.state.adsoyad}
          telefon={this.state.telefon}
          siparisicerik={this.state.tempsiparis}
          adres={this.state.adres}
          tutar={this.state.tutar}
          visible={this.state.visible}
          closefunc={(this.close = this.close.bind(this))}
          siparisdetay={[
            "This is ",
            <a>
              {this.state.tempsiparis.map((xy) => {
                <p>{xy.tutar}</p>;
              })}
            </a>,
            "working.",
          ]}
          siparisicerik={this.state.siparisdetay}
        />{" "}
      </div>
    );
  }
}
