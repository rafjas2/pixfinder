import React from "react";
import "./App.css";


const Header = ({ onReset }) => {
  return (
    <header id="nav">
      <h1 onClick={onReset} style={{ cursor: "pointer" }}>PixFinder</h1>
    </header>
  );
}

export default Header;