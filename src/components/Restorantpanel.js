import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "js-cookie";
import e from "cors";
const button = <button />;
export default class Restorantpanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      valu1: {},
      temp: "0",
    };

    this.urunsil = this.urunsil.bind(this);
    this.duzenle = this.duzenle.bind(this);
    this.urunekle = this.urunekle.bind(this);
    this.urunduzenle = this.urunduzenle.bind(this);
  }
  request() {
    this.setState({ data: [] });
    axios
      .post("//localhost:4250/restorantlist", { id: Cookies.get("id") })
      .then((res) => {
        //res.data.forEach((i) => console.log(i));
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.request();
  }

  urunekle() {
    // this.setState({ data: x });
    //console.log(this.state);

    this.setState((state) => {
      const data = state.data.concat({});
      return { data };
    });
  }

  urundegisim() {}
  urunduzenle(e) {
    [].slice.call(document.querySelector("#datas").children).forEach((item) => {
      let inputs = item.querySelectorAll("input");
      if (inputs[0] !== undefined) {
        console.log(item);
        console.log(item.querySelector(".form-control"));
        if (
          inputs[0].value &&
          inputs[0].value != "boş" &&
          item.querySelectorAll(".form-control")[1] != null &&
          this.state.temp == 1
        ) {
          axios
            .post("//localhost:4250/urunguncelle", {
              id: inputs[0].value,
              deger: inputs[1].value,
              fiyat: inputs[2].value,
            })
            .then((res) => {
              this.setState({ temp: 0 });
              swal({
                title: "Ürünler Güncelleniyor",
                text: "Kaydediliyor...",
                icon: "success",
                timer: 2000,
                buttons: false,
              });
              axios
                .post("//localhost:4250/urundegisim", {
                  restid: Cookies.get("id"),
                  id: inputs[0].value,
                  urunadi: inputs[1].value,
                  yenifiyat: inputs[2].value,
                })
                .then((res) => {
                  console.log(inputs[1], "-------");
                  inputs[1].classList.remove("form-control");
                  inputs[2].classList.remove("form-control");

                  inputs[1].setAttribute("disabled", true);
                  inputs[2].setAttribute("disabled", true);
                  alert("then");
                })
                .catch((err) => {
                  inputs[1].classList.remove("form-control");
                  inputs[2].classList.remove("form-control");

                  alert("adsads");
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
          //Güncelle
        } else if (
          inputs[0].value &&
          inputs[0].value == "boş" &&
          item.querySelectorAll(".form-control")[1] != null
        ) {
          axios
            .post("//localhost:4250/urunekle", {
              company_id: Cookies.get("id"),
              deger: inputs[1].value,
              fiyat: inputs[2].value,
            })
            .then((res) => {
              // console.log("123123");
              swal({
                title: "Ürün Güncellendi",
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

          // e.target.parentNode.parentNode.children[1].children[0].classList.remove(
          //   "form-control"
          // );
          // e.target.parentNode.parentNode.children[2].children[0].classList.remove(
          //   "form-control"
          // );
          console.log("ELSE");
          inputs[1].setAttribute("disabled", true);
          inputs[2].setAttribute("disabled", true);
          inputs[1].classList.remove("form-control");
          inputs[2].classList.remove("form-control");
        }
      }
    });
  }
  duzenle(e) {
    console.log(e.target.parentNode.parentNode.children[1].children[0]);
    e.target.parentNode.parentNode.children[1].children[0].removeAttribute(
      "disabled"
    );
    e.target.parentNode.parentNode.children[1].children[0].classList.toggle(
      "form-control"
    );
    e.target.parentNode.parentNode.children[2].children[0].removeAttribute(
      "disabled"
    );
    e.target.parentNode.parentNode.children[2].children[0].classList.toggle(
      "form-control"
    );
  }
  urunsil(e) {
    axios
      .post("//localhost:4250/urunsil", {
        // id: e.target.parentNode.parentNode.children[0].innerText,
        id: e.target.dataset.id,
      })
      .then((res) => {
        // this.setState({ data: res.data });
        this.request();
      })
      .catch((err) => {
        console.log(err);
      });
    //e.target.parentNode.parentNode.classList.add("d-none");
  }

  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
      this.setState({ temp: 1 });
    };
  }

  render() {
    return (
      <div>
        {/* <form action="//localhost:4250/urunguncelle" method="post">
          <input name="deger" value="benosmanım3" />
          <input name="id" value="10" />
          <button type="submit">Kaydet</button>
        </form> */}

        <Navbar state={this.state} place="restorant" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div style={{ overflowX: "auto" }}>
                <table className="table">
                  <thead>
                    <th>No</th>
                    <th>Ürün Adı</th>
                    <th>Fiyat</th>
                    <th>Sil</th>
                    <th>Düzenle</th>
                  </thead>
                  <tbody id="datas">
                    {this.state.data.map((datax, index) => {
                      return (
                        <tr>
                          <td>
                            {index + 1}
                            <input
                              type="hidden"
                              value={datax.id ? datax.id : "boş"}
                            ></input>
                          </td>
                          <td>
                            <input
                              style={{ background: "white" }}
                              disabled={datax.id != null ? true : false}
                              className={datax.id != null ? "" : "form-control"}
                              value={this.state.data.ad}
                              defaultValue={datax.ad}
                              onChange={this.onChangeHandle("data.ad")}
                            ></input>
                            {/* <input className="d-none" type="text">
                      {datax.ad}
                    </input> */}
                          </td>
                          <td>
                            <input
                              style={{ background: "white", width: "50px" }}
                              disabled={datax.id != null ? true : false}
                              className={datax.id != null ? "" : "form-control"}
                              value={this.state.data.fiyat}
                              defaultValue={datax.fiyat}
                              onChange={this.onChangeHandle("data.fiyat")}
                            ></input>
                            TL
                          </td>
                          <td>
                            <button
                              onClick={this.urunsil}
                              data-id={datax.id}
                              className="hover:bg-orange-400 py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                            >
                              Sil
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={this.duzenle}
                              className=" hover:bg-green-900 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                            >
                              Düzenle
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <button
                          onClick={this.urunekle}
                          type="button"
                          className="py-2 px-4 bg-red-700 hover:bg-yellow-900  text-white font-semibold rounded-lg shadow-md transform transition motion-reduce:transform-none hover:scale-110 duration-500 focus:outline-none"
                          //  onClick={this.urunekle}
                          tabIndex="-1"
                        >
                          Ürün Ekle
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button
                          onClick={this.urunduzenle}
                          //data-id={datax.id ? datax.id : "boş"}
                          data-cmp_id={Cookies.get("id")}
                          className=" hover:bg-blue-600 py-2 px-4 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                        >
                          KAYDET
                        </button>
                      </td>
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
