import { data } from "browserslist";
import React, { Component } from "react";
import "react-fancybox/lib/fancybox.css";
import swal from "sweetalert";
import Button from "./Button";
export default class deneme2 extends Component {
  constructor(props) {
    super(props);

    this.try = this.try.bind(this);
  }

  try() {
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".test").style.opacity = "1";
  }
  close() {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".test").style.opacity = "0.5";
    document.querySelector(".test").style.display = "none";
    document.querySelectorAll("#iptaldiv")[0].classList.add("d-none");
  }
  iptal(e) {
    // if (this.props.siparisicerik[0].teslim_durum == 3) {
    //   console.log(e.target);
    //   e.target.setAttribute("disabled", "");
    // }
    document.querySelectorAll("#iptaletbuton")[0].classList.add("d-none");
    document.querySelectorAll("#iptaldiv")[0].classList.remove("d-none");
    console.log(this.props.siparisicerik[0].teslim_durum);
  }
  iptalform() {
    swal("Sipariş iptal edildi ");
  }
  render() {
    return (
      <div
        className={this.props.visible == 1 ? "contain" : "contain d-none"}
        style={{ width: "100%", height: "100%" }}
      >
        <div
          className="test bg-secondary "
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            opacity: "0.5",
          }}
        ></div>
        <div
          className="modal fade bd-example-modal-lg show"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header" style={{ background: "#ab0012" }}>
                <h4
                  className="modal-title"
                  id="myLargeModalLabel"
                  style={{ color: "#fff" }}
                >
                  Sipariş Detayı
                </h4>
                <button
                  style={{ color: "#fff" }}
                  onClick={this.props.closefunc}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ height: "500px", width: "100%", overflowY: "scroll" }}
              >
                <label>
                  {" "}
                  <strong>Müşteri Adı Soyadı:</strong>
                </label>
                &nbsp;&nbsp;
                {this.props.adsoyad}
                <br /> <br />
                <label>
                  {" "}
                  <strong>Müşteri Telefon:</strong>
                </label>
                &nbsp;&nbsp;
                {this.props.telefon}
                <br /> <br />
                <label>
                  <strong>Sipariş Adresi:</strong>
                </label>
                &nbsp;&nbsp;
                {this.props.adres}
                <br></br>
                <label>
                  <strong>Siparişler:</strong>
                </label>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ color: "#ab0012" }}>Ürünler</th>
                      <th style={{ color: "#ab0012" }}>Adet</th>
                      <th style={{ color: "#ab0012" }}>Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.siparisicerik.map((item) => (
                      <tr>
                        {" "}
                        <td>{item.urunadi}</td>
                        <td>&nbsp;&nbsp;{item.urunadet}</td>
                        <td>{item.urunfiyat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr style={{ border: "solid black 1px" }} />
                <label style={{ fontSize: "2rem" }}>
                  <strong>Tutar:</strong>
                </label>
                <a style={{ marginLeft: "10px", fontSize: "2rem" }}>
                  {this.props.tutar} TL
                </a>
                {this.props.teslimdurum != 3 && this.props.iptaldurum != 1 ? (
                  <div className="col-md-12  d-flex flex-column  justify-content-center">
                    <Button
                      text="Siparişi İptal Et"
                      func={(this.iptal = this.iptal.bind(this))}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div id="iptaldiv" className="col-md-12 d-none">
                  <label style={{ color: "#ab0012" }}>
                    Siparişin İptal Edilme Nedeni
                  </label>
                  <textarea
                    onChange={this.props.inputchange}
                    className="mt-2 mb-2 form-control"
                  />
                  <Button
                    text="İptal Talebi Gönder"
                    func={this.props.iptalform}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
