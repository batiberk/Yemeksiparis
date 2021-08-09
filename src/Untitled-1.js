import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import swal from "sweetalert";
import Alert from "./Alert";
import Cookies from "js-cookie";

export default class Restorantpanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.urunsil = this.urunsil.bind(this);
    this.duzenle = this.duzenle.bind(this);
    this.urunekle = this.urunekle.bind(this);
    this.urunduzenle = this.urunduzenle.bind(this);
  }
  request() {
    axios
      .post("//http://localhost:3000:4250/restorantlist", {
        id: Cookies.get("id"),
      })
      .then((res) => {
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
    alert("OSMAAAN");
  }

  urunduzenle(e) {
    console.log(e.target.parentNode.parentNode.children[1].children[0].value);
    axios
      .post("//http://localhost:3000:4250/urunguncelle", {
        id: e.target.parentNode.parentNode.children[0].innerText,
        deger: e.target.parentNode.parentNode.children[1].children[0].value,
        fiyat: e.target.parentNode.parentNode.children[2].children[0].value,
      })
      .then((res) => {})
      .catch((err) => {});
  }
  duzenle(e) {
    console.log(e.target.parentNode.parentNode.children[1].children[0]);
    e.target.parentNode.parentNode.children[1].children[0].removeAttribute(
      "disabled"
    );
    e.target.parentNode.parentNode.children[2].children[0].removeAttribute(
      "disabled"
    );
  }
  urunsil(e) {
    axios
      .post("//http://localhost:3000:4250/urunsil", {
        // id: e.target.parentNode.parentNode.children[0].innerText,
        id: e.target.dataset.id,
      })
      .then((res) => {
        // this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(e.target.parentNode.parentNode.children[0].innerText);
    this.request();
  }
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
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

        <Navbar state={this.state} />
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Sil</th>
            <th>Düzenle</th>
            <th>KAYDET</th>
          </thead>
          <tbody>
            {this.state.data.map((datax) => {
              return (
                <tr>
                  <td>{datax.id}</td>
                  <td>
                    <input
                      style={{ background: "white" }}
                      disabled
                      value={this.state.data.ad}
                      defaultValue={datax.ad}
                      onChange={this.onChangeHandle("data.ad")}
                    ></input>
                    {/* <input className="d-none" type="text">
                      {datax.ad}
                    </input> */}
                  </td>
                  <td>
                    {" "}
                    <input
                      style={{ background: "white", width: "50px" }}
                      disabled
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
                      className="py-2 px-4 bg-danger text-white font-semibold rounded-lg shadow-md transform transition motion-safe:hover:scale-110 duration-500 focus:outline-none"
                    >
                      Sil
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={this.duzenle}
                      className=" hover:bg-green-700 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                    >
                      Düzenle
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={this.urunduzenle}
                      className=" hover:bg-blue-600 py-2 px-4 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                    >
                      KAYDET
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
