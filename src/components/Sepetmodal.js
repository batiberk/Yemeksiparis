import React, { Component } from "react";
import "react-fancybox/lib/fancybox.css";

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
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ color: "#ab0012" }}>Ürünler</th>
                      <th style={{ color: "#ab0012" }}>Adet</th>
                      <th style={{ color: "#ab0012" }}>Fiyat</th>
                      <th style={{ color: "#ab0012" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.siparisicerik.map((item) => (
                      <tr>
                        {" "}
                        <td>{item.yemek}</td>
                        <td>
                          {" "}
                          <input
                            className={this.props.inputclass}
                            type="number"
                            data-id={item.id}
                            value={item.adet}
                            onChange={this.props.onchange}
                            min="0"
                            max="100"
                          ></input>
                        </td>
                        <td>{item.fiyat}</td>
                        <td>
                          {" "}
                          <button
                            onClick={this.props.clkremove}
                            className="fas fa-times iclose"
                          ></button>
                        </td>
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
                <br /> <br />
                <div className="sepetbutton">
                  <button
                    className="btn-success bton"
                    onClick={this.props.clickfunc}
                  >
                    {" "}
                    Sepeti Onayla
                  </button>
                  <button
                    onClick={this.props.cleanclck}
                    className="btn-danger bton2"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
