import swal from "@sweetalert/with-react";
import React, { Component } from "react";
import axios from "axios";
import Entrycode from "./Entrycode";
export default class Forgetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      componentchange: 0,
      durum: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeHandle(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  async handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("//localhost:4250/maildogrula", {
        mail: this.state.email,
      })
      .then((res) => {
        if (res.data == true) {
          this.setState({ componentchange: 1 });
          axios
            .post("//localhost:4250/resetpassword", {
              mail: this.state.email,
              konu: "Confirm code",
              baslik: "Reset Password",
            })
            .then((res) => {
              //this.setState({ componentchange: 1 });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          swal("Böyle bir üyelik bulunmuyor");
        }

        // this.setState({ componentchange: 1 });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="fulldiv">
          <div
            className="aszx"
            style={{
              width: "500px",
              borderRadius: "5%",
            }}
          >
            <div className="" style={{ width: "60%" }}>
              <img></img>
            </div>
            <div
              style={{
                padding: "50px",
                background: "white",
                borderRadius: "5%",
              }}
              className="container diva"
            >
              {this.state.componentchange == 0 ? (
                <div className="changediv">
                  {" "}
                  <p>
                    Şifrenizi değiştirmek için kayıtlı mail adresinizi giriniz
                    ve gelen altı haneli kodu belirtilen alana giriniz.
                  </p>
                  <br></br>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <input
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeHandle("email")}
                        required
                      />
                    </div>
                    <br />
                    <div
                      className="buttondiv"
                      style={{ justifyContent: "center" }}
                    >
                      <button
                        type="submit"
                        className="py-2 px-3 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none"
                        tabIndex="-1"
                      >
                        Gönder
                      </button>
                      <br />
                    </div>
                  </form>
                </div>
              ) : (
                <Entrycode mail={this.state.email} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
