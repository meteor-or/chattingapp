import React, { Component } from "react";
import MassageHeader from "./MassageHeader";
import Massage from "./Massage";
import MasseageForm from "./MasseageForm";

export class Mainpanel extends Component {
  render() {
    return (
      <div style={{ padding: "2rem 2rem 0 2rem" }}>
        <MassageHeader />
        <div
          style={{
            width: "100%",
            height: "450px",
            border: ".15rem solid #ececec",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1rem",
            overflow: "auto",
          }}
        ></div>
        <MasseageForm />
      </div>
    );
  }
}

export default Mainpanel;
