import React from "react";
import axios from "axios";

export default function ContactUs() {
  function sendEmail() {
    axios
      .post("//localhost:4250/mailgonder", {
        mesaj: "osman",
        mail: "bati_berkdemir@hotmail.com",
        konu: "DENEMEEEEEEE",
        baslik: "BASLIK",
      })
      .then((res) => {
        alert("OSMAN");
      })
      .catch((error) => {
        alert("hata");
      });
  }
  return (
    <form className="form-group" className="contact-form" onSubmit={sendEmail}>
      <label>subject</label>
      <input className="form-control" type="text" name="subject" />

      <input className="form-control" type="submit" value="Send" />
    </form>
  );
}
