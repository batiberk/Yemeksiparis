import Cookies from "js-cookie";
import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.dipslaybutton = this.dipslaybutton.bind(this);
    this.cikis = this.cikis.bind(this);
    this.siparisver = this.siparisver.bind(this);
  }
  Ciro() {
    var str = window.location.href.toString();
    var a = str.indexOf("Siparislerim");
    var b = str.indexOf("Restorantprofil");
    var c = str.indexOf("Restorantpanel");
    var d = str.indexOf("Ciro");

    if (a == -1 && b == -1 && c == -1 && d == -1) {
      alert("dz");
    } else {
      window.location.href = "/Ciro";
    }
  }
  urunlerim() {
    window.location.href = "/Restorantpanel";
  }
  siparisver() {
    window.location.href = "/Restaurantlist";
  }
  siparislerim() {
    var str = window.location.href.toString();
    var a = str.indexOf("Siparislerim");
    var b = str.indexOf("Restorantprofil");
    var c = str.indexOf("Restorantpanel");
    var d = str.indexOf("Ciro");
    alert("a:" + a + "b:" + b + "c:" + c + "d:" + d);
    if (a == -1 && b == -1 && c == -1 && d == -1) {
      window.location.href = "/Uyesiparislerim";
    } else {
      window.location.href = "/Siparislerim";
    }
  }
  dipslaybutton() {
    document.getElementsByClassName("navmenu")[0].classList.toggle("d-none");
  }
  cikis() {
    //this.props.state.data = [];
    //console.log(this.props.state.data);

    Cookies.remove("uyead");
    Cookies.remove("resad");
    Cookies.remove("id");
    Cookies.remove("uyeid");
    window.location.href = "/";
  }
  profil() {
    var str = window.location.href.toString();
    var a = str.indexOf("Uyesiparislerim");
    var b = str.indexOf("Restaurantlist");
    var d = str.indexOf("Uyeprofil");
    var e = str.indexOf("Siparis/");
    if (Cookies.get("uyeid") && (a != -1 || b != -1 || d != -1 || e != -1)) {
      window.location.href = "/Uyeprofil";
    } else {
      window.location.href = "/Restorantprofil";
    }
  }

  render() {
    return (
      <div className="outerdiv">
        <div className=" asx">
          <div className="formdiv">
            <div className="dropdown">
              <span className="dropdown__name">
                {window.location.toString().indexOf("Restorantpanel") != -1 ||
                window.location.toString().indexOf("Restorantprofil") != -1 ||
                window.location.toString().indexOf("Ciro") != -1 ||
                window.location.toString().indexOf("Siparislerim") != -1
                  ? Cookies.get("resad").toUpperCase()
                  : Cookies.get("uyead").toUpperCase()}
              </span>
              <div className="dropdown__content">
                <button
                  onClick={(this.profil = this.profil.bind(this))}
                  className="dropdown__link--1"
                >
                  PROFİL
                </button>
                <button
                  onClick={(this.siparislerim = this.siparislerim.bind(this))}
                  className="dropdown__link--2"
                >
                  Siparişlerim
                </button>
                {window.location.toString().indexOf("Restorantpanel") != -1 ||
                window.location.toString().indexOf("Restorantprofil") != -1 ||
                window.location.toString().indexOf("Ciro") != -1 ||
                window.location.toString().indexOf("Siparislerim") != -1 ? (
                  <button
                    id="urun"
                    onClick={(this.urunlerim = this.urunlerim.bind(this))}
                    className="dropdown__link--3"
                  >
                    Ürünlerim
                  </button>
                ) : (
                  ""
                )}
                {window.location.toString().indexOf("Restaurantlist") != -1 ||
                window.location.toString().indexOf("Uyeprofil") != -1 ||
                window.location.toString().indexOf("Uyesiparislerim") != -1 ||
                window.location.toString().indexOf("Siparis/") != -1 ? (
                  <button
                    id="urun"
                    onClick={(this.siparisver = this.siparisver.bind(this))}
                    className="dropdown__link--3"
                  >
                    Sipariş Ver
                  </button>
                ) : (
                  ""
                )}
                {window.location.toString().indexOf("Restorantpanel") != -1 ||
                window.location.toString().indexOf("Restorantprofil") != -1 ||
                window.location.toString().indexOf("Ciro") != -1 ||
                window.location.toString().indexOf("Siparislerim") != -1 ? (
                  <button
                    id="urun"
                    onClick={(this.Ciro = this.Ciro.bind(this))}
                    className="dropdown__link--3"
                  >
                    İstatistikler
                  </button>
                ) : (
                  ""
                )}
                <button onClick={this.cikis} className="dropdown__link--4">
                  Çıkış Yap
                </button>
              </div>
            </div>

            {/* <div className="navbarlogin">
            <button onClick={this.dipslaybutton}>
              {Cookies.get("userId").toUpperCase()}
              &nbsp; &nbsp;
              <i class="fas fa-angle-down"></i>
            </button>
          </div> */}
          </div>
        </div>

        {/* <div className="navmenu d-none">
          <li className="listtyle" onClick={this.profil}>
            Profil
          </li>
          <li className="listtyle">Siparişlerim</li>
          <li className="listtyle" onClick={this.logout}>
            Çıkış Yap
          </li>
        </div> */}
      </div>
    );
  }
}
