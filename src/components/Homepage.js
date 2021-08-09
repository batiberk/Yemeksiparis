import axios from "axios";
import React, { Component } from "react";
import Alert from "./Alert";
import swal from "@sweetalert/with-react";
import Cookies from "js-cookie";
import Sepetmodal from "./Sepetmodal";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diziapi: [],
      myArray: [],
      hesap: [],
      total: "0",
      slug: this.props.slug,
      dizi: [],
      visible: 0,
      sepetozet: [],
    };
    this.sepeteekle = this.sepeteekle.bind(this);
    this.reset = this.reset.bind(this);
    this.removeclass = this.removeclass.bind(this);
    this.deneme = this.deneme.bind(this);
    this.sepetionayla = this.sepetionayla.bind(this);
    this.alertshow = this.alertshow.bind(this);
    this.removeproduct = this.removeproduct.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.closesepet = this.closesepet.bind(this);
    this.inputchange = this.inputchange.bind(this);
  }

  sepeteekle(e) {
    console.log(this.state.total);

    var id = e.target.id;
    var yemek = e.target.parentNode.parentNode.children[1].innerText;
    var fiyat = e.target.parentNode.parentNode.children[2].innerText;
    var inputdeger =
      e.target.parentNode.parentNode.children[3].children[0].value;
    var deger = false;
    var hesapArr = this.state.hesap;
    var data = this.state.hesap;
    var total = 0;

    var x;
    if (inputdeger > 100 || total > 2000) {
      swal(
        "Sepetinizde yüzden fazla ürün olamaz ve 2000 TL üzerinde sipariş veremezsiniz."
      );
      setTimeout(this.alertshow, 100);
      setTimeout(this.deneme, 5000);
    }
    if (inputdeger <= 100) {
      hesapArr.forEach((item) => {
        if (item.id == id) {
          item.adet += inputdeger != 0 ? parseInt(inputdeger) : 1;

          deger = true;
        }
      });
      if (deger == false) {
        hesapArr.push({
          yemek: yemek,
          fiyat: fiyat,
          inputveri: inputdeger,
          id: id,
          adet: inputdeger == 0 ? 1 : parseInt(inputdeger),
        });

        var sepet = this.state.hesap;
        sepet[0].inputveri != ""
          ? (sepet[0].inputveri = sepet[0].inputveri + 1)
          : (sepet[0].inputveri = 1);
        this.setState({ hesap: sepet });
      }

      this.setState({ hesap: hesapArr });
    }

    data.forEach((el) => {
      x = el.fiyat.replace(/[^0-9]/g, "");

      var xint = parseInt(x);

      //total=xint*data[0].adet;
      if (el.adet != 0) {
        total += xint * el.adet;
      }
    });

    this.setState({ total: total });

    e.target.parentNode.parentNode.children[3].children[0].value = 0;
  }

  reset(e) {
    this.setState({ hesap: [] });
    this.setState({ total: ["0"] });
  }

  removeclass() {
    this.setState({ visible: 1 });
  }

  deneme() {
    document.getElementById("alert").classList.add("d-none");
  }
  alertshow() {
    document.getElementById("alert").classList.remove("d-none");
  }
  removeproduct(e) {
    var id = e.target.parentNode.parentNode.children[1].children[0].dataset.id;
    var arr = this.state.hesap;
    var newArr = [];
    var total = 0;
    var x = 0;
    console.log(e.target.parentNode.parentNode.children[1].children[0]);
    arr.map((data) => {
      if (data.id != id) {
        newArr.push(data);
        x = data.fiyat.replace(/[^0-9]/g, "");

        total += x * data.adet;
      }
    });

    this.setState({ hesap: newArr, total: total });
  }
  closesepet(e) {
    console.log(e.target.parentNode.classList.add("d-none"));
  }
  componentDidMount = async () => {
    axios
      .get("//localhost:4250/urun/" + this.state.slug) //slug eklendi
      .then((res) => {
        this.setState({
          dizi: res.data,
        });
      })
      .catch((err) => {});
  };
  handlechange(e) {
    if (e.target.value > 100) {
      swal("100 den fazla ürün ekleyemezsiniz");
      e.target.value = 100;
    }
    var id = e.target.dataset.id;
    var arr = this.state.hesap;

    arr.map((data) => {
      if (data.id == id) {
        var deger = parseInt(e.target.value);
        data.adet = deger;
      }
    });
    var total = 0;
    var x = 0;
    arr.map((data) => {
      x = data.fiyat.replace(/[^0-9]/g, "");

      total += x * data.adet;
    });

    this.setState({ hesap: arr, total: total });
  }

  sepetionayla(e) {
    if (this.state.total == 0) {
      swal("Sepetiniz boş");
    } else if (this.state.total > 2000) {
      swal("Sepetinizin tutarı 2000 TL'den fazla olamaz");
    } else {
      axios
        .post("//localhost:4250/siparisgonder", {
          tutar: this.state.total,
          uyeId: Cookies.get("uyeid"),
          urunler: this.state.hesap,
          rest_Id: this.props.slug,

          // sepetid:,
          // uyeid:,
        })
        .then((res) => {
          if (res.data == "Başarılı") {
            e.target.setAttribute("disabled", "true");
            swal({
              title: "Sipariş Gönderildi ",
              text: "Anasayfaya yönlendiriliyorsunuz...",
              icon: "success",
              timer: 2000,
              buttons: false,
            });
            setTimeout(() => (window.location.href = "/Restaurantlist"), 2000);
          }
        })
        .catch((err) => {
          console.log("HATA");
        });
      //console.log(this.state);
      this.state.hesap.map((data) => {});
    }
  }
  inputchange() {
    alert("dfdsd");
  }
  close() {
    this.setState({ visible: 0 });
  }
  render() {
    return (
      <div className="duzen ">
        <Alert text="100' den fazla ürün ekleyemezsiniz." func={this.deneme} />
        <Sepetmodal
          visible={this.state.visible}
          closefunc={(this.close = this.close.bind(this))}
          siparisdetay={[
            <a>
              {/* {this.state.data.map((xy) => {
                <p>{xy.tutar}</p>;
              })} */}
              14
            </a>,
          ]}
          clkremove={this.removeproduct}
          cleanclck={this.reset}
          clickfunc={this.sepetionayla}
          inputclass="input2 form-control"
          onchange={this.handlechange}
          siparisicerik={this.state.hesap}
          tutar={this.state.total}
        />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ visibility: "hidden" }}>
                  <p className="asss">ID</p>
                </th>
                <th>
                  <p className="asss">Yemek</p>
                </th>
                <th>
                  <p className="asss">Sepete ekle</p>
                </th>
                <th>
                  <p className="asds">Adet</p>
                </th>
                <th>
                  <p className="asss">Fiyat</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.dizi.map((data, index) => {
                return (
                  <tr key={index}>
                    <td style={{ visibility: "hidden" }}>{data.id}</td>
                    <td>{data.ad}</td>
                    <td>{data.fiyat} TL</td>
                    <td className="tdinput">
                      <input
                        id="input"
                        min="0"
                        max="100"
                        className="input form-control"
                        type="number"
                        placeholder="0"
                      />
                    </td>

                    <td>
                      <button
                        onClick={this.sepeteekle}
                        className=" btn btn-danger"
                        id={data.id}
                      >
                        Sepete Ekle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="osmanid" className="col-lg-3 col-md-3 col-sm-10 d-none"></div>
        <button onClick={this.removeclass} className="sepetbuton shoppingcard">
          {" "}
          <i className="fas fa-shopping-cart "></i>
        </button>
      </div>
    );
  }
}
