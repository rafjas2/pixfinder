import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";

class App extends Component {
  render() {
    return (
      <div id="wrap">
        <Header />
        <Search />
        <Footer />
      </div>
    );
  }
}

export default App;