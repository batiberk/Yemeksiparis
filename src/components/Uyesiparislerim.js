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
      filtre: [0, 1, 2],
      interval: "",
    };
    this.detaylar = this.detaylar.bind(this);
    this.request = this.request.bind(this);
  }
  request() {
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
    const interval = setInterval(() => {
      this.request();
    }, 5000);

    this.setState({ interval: interval });
  }
  componentWillMount() {
    clearInterval(this.state.interval);
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
        this.setState({ filtre: [0, 1, 2] });
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-12  ">
              <div style={{ marginTop: "25px" }} className="row">
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="col-lg-12 col-md-6 col-sm-6 col-6 "
                >
                  <input
                    data-durum="0"
                    data-icon="✔"
                    onChange={(this.tesliminput = this.tesliminput.bind(this))}
                    className="inputfilter"
                    //onChange={(this.onayinput = this.onayinput.bind(this))}
                    type="checkbox"
                    value=""
                  />
                  <label style={{ marginLeft: "2%" }}>Onay Bekliyor</label>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="col-lg-12 col-md-6  col-sm-6 col-6 "
                >
                  <input
                    data-icon="✔"
                    data-durum="1"
                    className="inputfilter"
                    onChange={(this.tesliminput = this.tesliminput.bind(this))}
                    //onChange={(this.hazirinput = this.hazirinput.bind(this))}
                    type="checkbox"
                    value=""
                  />
                  <label style={{ marginLeft: "2%" }}>Hazırlanıyor</label>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="col-lg-12 col-md-6 col-sm-6 col-6  "
                >
                  <input
                    data-icon="✔"
                    data-durum="2"
                    className=" inputfilter"
                    onChange={(this.tesliminput = this.tesliminput.bind(this))}
                    type="checkbox"
                    value=""
                  />
                  <label style={{ marginLeft: "2%" }}>Yolda</label>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="col-lg-12 col-md-6 col-sm-6 col-6  "
                >
                  <input
                    data-icon="✔"
                    data-durum="3"
                    onChange={(this.tesliminput = this.tesliminput.bind(this))}
                    className=" inputfilter"
                    type="checkbox"
                    value=""
                  />
                  <label style={{ marginLeft: "2%" }}>Teslim Edildi</label>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="col-lg-12 col-md-6 col-sm-6 col-6  "
                >
                  <input
                    data-icon="✔"
                    data-durum="4"
                    onChange={(this.tesliminput = this.tesliminput.bind(this))}
                    className=" inputfilter"
                    type="checkbox"
                    value=""
                  />
                  <label style={{ marginLeft: "2%" }}>İptal Edildi</label>
                </div>
              </div>
            </div>
            <div className=" col-lg-9 col-md-12  ">
              <div className="container col-sm-12">
                <div className="row">
                  <div className="col-md-12">
                    <div style={{ overflowX: "auto" }}>
                      <table className="table">
                        <thead>
                          <th>No</th>
                          <th>Tarih</th>
                          <th>Restorant</th>
                          <th>Tutar</th>
                          <th>Teslimat Durumu</th>
                          <th>Sipariş Özet</th>
                        </thead>
                        <tbody id="datas">
                          {/* {this.state.data.map((datax, index) => { */}
                          {/* // return ( */}

                          {this.state.tempsiparis.map((datax, index) => {
                            return (
                              <React.Fragment>
                                {datax.teslim_durum == this.state.filtre[0] ||
                                datax.teslim_durum == this.state.filtre[1] ||
                                datax.teslim_durum == this.state.filtre[2] ||
                                (datax.teslim_durum == this.state.filtre[3] &&
                                  this.state.teslimdurum == false) ? (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      {new Date(
                                        datax.siparis_tarihi
                                      ).toLocaleString()}
                                    </td>
                                    <td> {datax.restorantadi}</td>
                                    <td>{datax.tutar} TL</td>
                                    <td id="teslimid">
                                      {" "}
                                      {datax.teslim_durum == 2
                                        ? "Yolda"
                                        : datax.teslim_durum == 1
                                        ? "Hazırlanıyor"
                                        : datax.teslim_durum == 3
                                        ? "Teslim Edildi"
                                        : datax.teslim_durum == 4
                                        ? "İptal Edildi"
                                        : "Onaylanmadı"}
                                    </td>

                                    <td>
                                      <Button
                                        dataid={datax.siparisid}
                                        text="Detaylar"
                                        func={this.detaylar}
                                      />
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                {datax.teslim_durum == 3 &&
                                this.state.teslimdurum == true ? (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      {new Date(
                                        datax.siparis_tarihi
                                      ).toLocaleString()}
                                    </td>
                                    <td> {datax.restorantadi}</td>
                                    <td>{datax.tutar} TL</td>
                                    <td id="teslimid">
                                      {" "}
                                      {datax.teslim_durum == 2
                                        ? "Yolda"
                                        : datax.teslim_durum == 1
                                        ? "Hazırlanıyor"
                                        : datax.teslim_durum == 3
                                        ? "Teslim Edildi"
                                        : "Onaylanmadı"}
                                    </td>

                                    <td>
                                      <Button
                                        dataid={datax.siparisid}
                                        text="Detaylar"
                                        func={this.detaylar}
                                      />
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
