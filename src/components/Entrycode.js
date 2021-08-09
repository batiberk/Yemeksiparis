import React, { Component } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import Newpassword from "./Newpassword";

export default class Entrycode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durum: 0,
      mail: this.props.mail,
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    alert("asdsa");
    var tab = parseInt(e.target.getAttribute("tabIndex"));
    var inputvalue = e.target.value.length;

    if (inputvalue == e.target.maxLength) {
    }
    console.log(tab);
  }
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
      var inputvalue = e.target.value.length;
      console.log(e);
      console.log(e.target);
      console.log(e.target.dataset);
      if (inputvalue == e.target.maxLength) {
        if (e.target.dataset.last != "true")
          e.target.nextElementSibling.focus();
      }
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const i = this.state;
    var code = i.input1 + i.input2 + i.input3 + i.input4 + i.input5 + i.input6;
    await axios
      .post("//localhost:4250/comparecode", {
        mail: this.state.mail,
        code: code,
      })
      .then((res) => {
        if (res.data.message == "success") {
          this.setState({ durum: 1 });
          //ŞİFRE EKRANINA GÖNDER
        }
      })
      .catch((error) => {
        swal("Yanlış Kod Girildi");
      });
  }
  render() {
    return (
      <div>
        {this.state.durum == 0 ? (
          <form onSubmit={this.handleSubmit}>
            <div
              className="entrycode"
              style={{
                background: "white",
                borderRadius: "5%",
                width: "100%",
              }}
            >
              <div>
                <label>
                  <span style={{ fontWeight: "bold" }}>{this.props.mail}</span>{" "}
                  adresine gönderilen kodu giriniz
                </label>
              </div>
              <div
                className="xdiv"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "10px",
                }}
              >
                <input
                  autoFocus="true"
                  value={this.state.input1}
                  onChange={this.onChangeHandle("input1")}
                  required
                  className="code"
                  type="text"
                  min="0"
                  max="9"
                  maxlength="1"
                  tabIndex="1"
                  data-last="false"
                />
                <input
                  tabIndex="2"
                  value={this.state.input2}
                  onChange={this.onChangeHandle("input2")}
                  required
                  min="0"
                  max="9"
                  className="code"
                  type="text"
                  data-last="false"
                  maxLength="1"
                />
                <input
                  tabIndex="3"
                  min="0"
                  max="9"
                  value={this.state.input3}
                  onChange={this.onChangeHandle("input3")}
                  className="code"
                  type="text"
                  maxLength="1"
                  data-last="false"
                />
                <input
                  tabIndex="4"
                  value={this.state.input4}
                  onChange={this.onChangeHandle("input4")}
                  required
                  min="0"
                  max="9"
                  className="code"
                  type="text"
                  maxLength="1"
                  data-last="false"
                />
                <input
                  tabIndex="5"
                  value={this.state.input5}
                  onChange={this.onChangeHandle("input5")}
                  required
                  min="0"
                  max="9"
                  className="code"
                  type="text"
                  maxLength="1"
                  data-last="false"
                />
                <input
                  tabIndex="6"
                  data-last="true"
                  value={this.state.input6}
                  onChange={this.onChangeHandle("input6")}
                  required
                  min="0"
                  max="9"
                  className="code"
                  type="text"
                  maxLength="1"
                />
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  className=" py-2 px-3 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none"
                  tabIndex="-1"
                >
                  Giriş Yap
                </button>
              </div>
            </div>
          </form>
        ) : (
          <Newpassword mail={this.state.mail} />
        )}
      </div>
    );
  }
}
