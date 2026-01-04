import React from "react";
import "./App.css";
import varcel from "./images/vercel-icon-svgrepo-com.svg";
import github from "./images/github.svg";

const Footer = () => {
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

export default Footer;