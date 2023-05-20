import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import heroku from "./heroku2.svg";
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
          <a href="https://raf-react-app.herokuapp.com/">
            <img src={heroku} alt="Heroku Logo" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;