import axios from "axios";
import Cookies from "js-cookie";
import React, { Component } from "react";
import Navbar2 from "./Navbar2";

export default class Ciro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: "20%",
      urunsatis: [],
      aylikciro: "",
      ciro: null,
      postmounth: "",
      postyear: "",
    };
  }
  async request() {
    await axios
      .post("//localhost:4250/urunsatisgrafik", {
        restorant_Id: Cookies.get("id"),
        mounth: this.state.postmounth,
        year: this.state.postyear,
      })
      .then((res) => {
        this.setState({ urunsatis: res.data });
      })
      .catch((err) => {});
    await axios
      .post("//localhost:4250/aylikciro", {
        restid: Cookies.get("id"),
        mounth: this.state.postmounth,
        year: this.state.postyear,
      })
      .then((res) => {
        this.setState({ aylikciro: res.data });
        this.setState({ ciro: this.state.aylikciro[0].toplam });
      })
      .catch((err) => {});
  }
  async componentDidMount() {
    await axios
      .post("//localhost:4250/urunsatisgrafik", {
        restorant_Id: Cookies.get("id"),

        mounth: this.state.postmounth,
        year: this.state.postyear,
      })
      .then((res) => {
        this.setState({ urunsatis: res.data });
      })
      .catch((err) => {});
    await axios
      .post("//localhost:4250/aylikciro", {
        restid: Cookies.get("id"),
        mounth: this.state.postmounth,
        year: this.state.postyear,
      })
      .then((res) => {
        alert("res.data");
        this.setState({ aylikciro: res.data });
        this.setState({ ciro: this.state.aylikciro[0].toplam });
      })
      .catch((err) => {});
  }
  async selectmounth(e) {
    await this.setState({ postmounth: e.target.value });
    this.request();
  }
  async selectyear(e) {
    await this.setState({ postyear: e.target.value });
    this.request();
  }
  render() {
    var arr = [];
    for (var i = 2000; i < new Date().getFullYear() + 1; i++) {
      arr.push(i);
    }
    console.log(arr);
    return (
      <div>
        {" "}
        <Navbar2 />
        <div
          className="container-fluid"
          style={{ minHeight: "90vh", background: "#d6d2d2" }}
        >
          <div
            style={{ height: "9vh", borderRadius: "10px" }}
            className="col-12 bg-white"
          >
            <select
              id="selectid"
              onChange={(this.selectmounth = this.selectmounth.bind(this))}
              style={{ marginTop: "15px" }}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected>AY SEÇİNİZ</option>
              <option value="01">OCAK</option>
              <option value="02">ŞUBAT</option>
              <option value="03">MART</option>
              <option value="04">NİSAN</option>
              <option value="05">MAYIS</option>
              <option value="06">HAZİRAN</option>
              <option value="07">TEMMUZ</option>
              <option value="08">AĞUSTOS</option>
              <option value="09">EYLÜL</option>
              <option value="10">EKİM</option>
              <option value="11">KASIM</option>
              <option value="12">ARALIK</option>
            </select>

            <select
              id="selectid2"
              onChange={(this.selectyear = this.selectyear.bind(this))}
              style={{ marginTop: "15px", marginLeft: "25px" }}
              className="form-select"
              aria-label="Default select example"
            >
              {arr.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 p-3 ">
              <div
                className="m-3 overflow-auto bg-white"
                style={{
                  height: "70vh",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                <div className="content">
                  <h5 style={{ textAlign: "center" }}>AYLIK SATIŞ</h5>
                  <div
                    style={{
                      height: "90%",
                      display: "flex",
                      height: "160px",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        width: "90%",
                        fontSize: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {this.state.ciro != null
                        ? this.state.ciro + "TL "
                        : "Kayıt Bulunamadı"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-lg-3 col-md-12 col-sm-12 p-3 ">
              <div
                className="m-3  bg-white"
                style={{
                  height: "70vh",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                <h5 style={{ textAlign: "center" }}>SATIŞ İSTATİSTİKLERİ</h5>
                <div style={{ overflowY: "scroll", height: "90%" }}>
                  {this.state.urunsatis != "" ? (
                    this.state.urunsatis.map((data, index) => {
                      return (
                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="col-lg-4 col-md-2 col-sm-2">
                            {" "}
                            <a>{data.urunadi.toUpperCase()} </a>
                          </div>
                          <div className="col-lg-6 col-md-8 col-sm-8">
                            <canvas
                              style={{
                                width:
                                  (data.urunadet / data.toplam) * 100 + "%",
                                height: "15px",
                                background: "red",
                                borderBottomRightRadius: "7px",
                                borderTopRightRadius: "7px",
                              }}
                            >
                              {" "}
                            </canvas>
                          </div>
                          <a style={{ fontWeight: "bold", fontSize: "13px" }}>
                            {data.urunadet} ADET
                          </a>
                        </div>
                      );
                    })
                  ) : (
                    <p
                      style={{
                        marginTop: "15%",
                        width: "90%",
                        fontSize: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Kayıt Bulunamadı
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-md-12 col-sm-12 p-3 ">
              <div
                className="m-3  bg-white"
                style={{
                  height: "70vh",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                <h5 style={{ textAlign: "center" }}></h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 p-3 ">
              <div
                className="m-3  bg-white"
                style={{
                  height: "70vh",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                <p style={{ wordWrap: "break-word" }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
