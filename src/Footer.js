import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import varcel from "./vercel-icon-svgrepo-com.svg";
import github from "./github.svg";

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="icons">
          <a href="https://github.com/rafjas2/my-react-app">
            <img src={github} alt="GitHub Logo" />
          </a>
        </div>
        <div className="icons">
          <a href="https://pixfinder.vercel.app/">
            <img src={varcel} alt="Varcel Logo" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;