import axios from "axios";
import Cookies from "js-cookie";
import React, { Component } from "react";
import Button from "./Button";
import Deneme from "./Deneme";
import Deneme2 from "./Deneme2";
import Navbar from "./Navbar";

export default class Siparislerim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siparisid: "",
      data: [],
      siparisdetay: [],
      visible: 0,
      siparisicerik: [],
      tutar: [],
      uyead: [],
      uyesoyad: [],
      uyead2: [],
      uyesoyad2: [],
      uyeadres: [],
      uyetel: [],
      tempsiparis: [],
      filtre: [0, 1, 2],
      teslimdurum: "",
      iptaldurum: "",
      area: [],
    };
    this.detaylar = this.detaylar.bind(this);
  }
  request() {
    axios
      .post("//localhost:4250/siparisgetir", { id: Cookies.get("id") })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    axios
      .post("//localhost:4250/siparisgetir", { id: Cookies.get("id") })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.state.data.map((item) => {});
    const interval = setInterval(() => {
      this.request();
    }, 5000);

    this.setState({ interval: interval });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  detaylar(e) {
    this.setState({ siparisid: e.target.dataset.id });
    axios
      .post("//localhost:4250/siparisdetay2", {
        siparisid: e.target.dataset.id,
      })
      .then((response) => {
        this.setState({
          tempsiparis: response.data,
          uyead: response.data[0].ad,
          uyesoyad: response.data[0].soyad,
          uyetel: response.data[0].telefon,
          uyeadres: response.data[0].adres,
          tutar: response.data[0].tutar,
          teslimdurum: response.data[0].teslim_durum,
          iptaldurum: response.data[0].iptaldurum,
        });
        //alert(e.target.dataset.id);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ visible: 1 });
    console.log(this.state);
  }
  close() {
    document.querySelectorAll("#iptaldiv")[0].classList.add("d-none");
    document.querySelectorAll("#iptaletbuton")[0].classList.remove("d-none");
    // document.querySelector(".modal").style.display = "none";
    // document.querySelector(".test").style.opacity = "1";
    this.setState({ visible: 0 });
    console.log(this.state.tempsiparis);
  }
  onayla(e) {
    axios
      .post("//localhost:4250/siparisonay", {
        id: e.target.dataset.siparisid,
      })
      .then((response) => {
        this.request();
      })
      .catch((err) => {});

    this.request();
  }
  selectchange(e) {
    //teslimat durumu:e.target.value;

    axios
      .post("//localhost:4250/teslimdurum", {
        id: e.target.dataset.selectid,
        value: e.target.value,
      })
      .then((response) => {
        this.request();
      })
      .catch((err) => {});
    this.request();
    console.log(this.state.uyead2);
    axios
      .post("//localhost:4250/mailgonder", {
        mesaj: `Sayın ${e.target.dataset.selectad} ${
          e.target.dataset.selecttarih
        } tarihinde verilen siparişiniz ${
          e.target.value == 1
            ? "hazırlanıyor"
            : e.target.value == 2
            ? "teslim edilmek üzere yola çıkmıştır."
            : e.target.value == 3
            ? "teslim Edilmiştir."
            : ""
        } `,
        mail: e.target.dataset.selectmail,
        konu: "Sipariş Durumu",
        baslik: "FİRMA ADI",
      })
      .then((res) => {
        alert("OSMAN");
      })
      .catch((error) => {
        alert("hata");
      });
    console.log(this.state);
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
  textareachange(e) {
    this.setState({ area: e.target.value });
  }

  iptalformgonder() {
    axios
      .post("//localhost:4250/iptalet", { id: this.state.siparisid })
      .then((res) => {
        this.setState({ visible: 0 });
        this.request();
      })
      .catch((error) => {
        alert("hata");
      });
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Navbar />

        <Deneme2
          iptalform={(this.iptalformgonder = this.iptalformgonder.bind(this))}
          inputchange={(this.textareachange = this.textareachange.bind(this))}
          denemex="13"
          visible={this.state.visible}
          closefunc={(this.close = this.close.bind(this))}
          adsoyad={this.state.uyead + this.state.uyesoyad}
          siparisicerik={this.state.tempsiparis}
          adres={this.state.uyeadres}
          tutar={this.state.tutar}
          telefon={this.state.uyetel}
          teslimdurum={this.state.teslimdurum}
          iptaldurum={this.state.iptaldurum}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-md-12  ">
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
                    data-iptaldurum="1"
                    onChange={(this.tesliminput = this.tesliminput.bind(this))}
                    className=" inputfilter"
                    type="checkbox"
                    value=""
                  />
                  <label style={{ marginLeft: "2%" }}>İptal Edildi</label>
                </div>
              </div>
            </div>
            <div className="col-md-10 col-sm-12">
              <div style={{ overflowX: "auto" }}>
                <table className="table">
                  <thead>
                    <th>No</th>
                    <th>Sipariş Saati</th>
                    <th>Hesap</th>
                    <th>Onay Durumu</th>
                    <th>Teslimat Bilgisi</th>
                    <th>Detaylar</th>
                  </thead>
                  <tbody id="datas">
                    {this.state.data.map((datax, index) => {
                      return (
                        <React.Fragment>
                          {datax.teslim_durum == this.state.filtre[0] ||
                          datax.teslim_durum == this.state.filtre[1] ||
                          datax.teslim_durum == this.state.filtre[2] ||
                          datax.teslim_durum == this.state.filtre[3] ||
                          datax.teslim_durum == this.state.filtre[4] ? (
                            <tr
                              style={
                                datax.iptaldurum != null
                                  ? { background: "#ab0012" }
                                  : datax.teslim_durum == 3
                                  ? { background: "#01281a" }
                                  : { background: "#dce125" }
                              }
                            >
                              <td
                                style={
                                  datax.iptaldurum != null
                                    ? { color: "white" }
                                    : datax.teslim_durum == 3
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                {index + 1}
                              </td>
                              <td
                                style={
                                  datax.iptaldurum != null
                                    ? { color: "white" }
                                    : datax.teslim_durum == 3
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                {new Date(
                                  datax.siparis_tarihi
                                ).toLocaleString()}
                              </td>
                              <td
                                style={
                                  datax.iptaldurum != null
                                    ? { color: "white" }
                                    : datax.teslim_durum == 3
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                {datax.tutar} TL
                              </td>
                              <td>
                                {datax.iptaldurum == null ? (
                                  <button
                                    data-siparisid={datax.id}
                                    onClick={
                                      (this.onayla = this.onayla.bind(this))
                                    }
                                    className={
                                      datax.siparis_onay == 2
                                        ? "hover:bg-red-600 py-2 px-4 bg-red-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                                        : " hover:bg-green-600 py-2 px-4 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                                    }
                                  >
                                    {datax.siparis_onay == 2
                                      ? "ONAYLANMADI"
                                      : datax.siparis_onay == 1
                                      ? "ONAYLANDI"
                                      : ""}
                                  </button>
                                ) : (
                                  <p style={{ color: "white" }}>İPTAL EDİLDİ</p>
                                )}
                              </td>

                              <td>
                                <select
                                  disabled={
                                    datax.teslim_durum == 3 ||
                                    datax.siparis_onay == 2 ||
                                    datax.iptaldurum != null
                                      ? true
                                      : false
                                  }
                                  data-selectid={datax.id}
                                  data-selectad={datax.ad + " " + datax.soyad}
                                  data-selectmail={datax.mail}
                                  data-selecttarih={datax.siparis_tarihi}
                                  onChange={
                                    (this.selectchange =
                                      this.selectchange.bind(this))
                                  }
                                  className="custom-select col-lg-8"
                                  aria-label="Default select example"
                                >
                                  <option
                                    disabled={
                                      datax.teslim_durum == 1 ||
                                      datax.teslim_durum == 2 ||
                                      datax.teslim_durum == 3
                                        ? true
                                        : false
                                    }
                                    selected={
                                      datax.teslim_durum == 0 ? true : false
                                    }
                                  >
                                    Teslimat Durumunu Seçiniz
                                  </option>
                                  <option
                                    disabled={
                                      datax.teslim_durum == 2 ||
                                      datax.teslim_durum == 3
                                        ? true
                                        : false
                                    }
                                    selected={
                                      datax.teslim_durum == 1 ? true : false
                                    }
                                    value="1"
                                  >
                                    Hazırlanıyor
                                  </option>
                                  <option
                                    disabled={
                                      datax.teslim_durum == 3 ? true : false
                                    }
                                    selected={
                                      datax.teslim_durum == 2 ? true : false
                                    }
                                    value="2"
                                  >
                                    Yolda
                                  </option>
                                  <option
                                    selected={
                                      datax.teslim_durum == 3 ? true : false
                                    }
                                    value="3"
                                  >
                                    Teslim Edildi
                                  </option>
                                </select>
                              </td>
                              <td>
                                <Button
                                  datadurum={datax.teslim_durum}
                                  dataid={datax.id}
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
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
