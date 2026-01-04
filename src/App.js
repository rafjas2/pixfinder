import React from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";

const App = () => {
  const [searchKey, setSearchKey] = React.useState(0);

  const resetSearch = () => {
    setSearchKey(prev => prev + 1);
  };

  return (
    <div id="wrap">
      <Header onReset={resetSearch} />
      <Search key={searchKey} />
      <Footer />
    </div>
  );
}

export default App;