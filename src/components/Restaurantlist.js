import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import slugify from "slugify";
export default class Restaurantlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginname: "asdasdsa",
      diziapi: [],
      data: [],
    };

    this.restorantname = this.restorantname.bind(this);
  }

  componentDidMount = async () => {
    const response = await axios.get("//localhost:4250");
    axios
      .get("//localhost:4250")
      .then((res) => {
        this.setState({ data: res.data });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log("HATA");
      });

    this.setState({
      diziapi: response.data,
    });
  };
  restorantname(e) {
    // var restorantadi=e.target.innerText;
    window.localStorage.setItem("istedigim", e.target.innerText);
  }

  render() {
    return (
      <div>
        <Navbar loginname={this.state.loginname} />
        <div>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Restorant Adı</th>
                <th>Puan</th>
                <th>Min Paket tutarı</th>
              </tr>
            </thead>
            <tbody>
              {this.state.diziapi.map((data) => {
                return (
                  <tr style={{ height: "50px" }}>
                    <td>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        className="logo"
                        src={"http://localhost:4250/image/" + data.logo}
                        alt="My_Logo"
                      />
                    </td>
                    <td>
                      <Link
                        onClick={this.restorantname}
                        to={"/Siparis/" + slugify(data.slug)}
                      >
                        {data.restorantadi}{" "}
                      </Link>
                    </td>
                    <td>{data.puan}/10</td>
                    <td>{data.mintutar} TL</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
