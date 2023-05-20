import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import Gallery from "./Gallery";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      perPage: 24,
      apiUrl: "https://pixabay.com/api",
      apiToken: "11779217-a9b30eeba040492648696ebe5",
      images: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    this.setState({ searchData: event.target.value });
  }

  handleSubmit(event) {
    fetch(
      `${this.state.apiUrl}/?key=${this.state.apiToken}&q=${
        this.state.searchData
      }&image_type=photo&per_page=${this.state.perPage}&safesearch=true`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          images: data.hits.map(hit => {
            return {
              image: hit.webformatURL,
              id: hit.id,
              tags: hit.tags,
              user: hit.user,
              userImg: hit.userImageURL
            };
          })
        })
      )
      .catch(error => console.log(error));
    event.preventDefault();
  }

  handleKeyPress = e => {
    const bgImg = document.querySelector("#bg-img");

    if (e.charCode === 13) {
      bgImg.style.display = "none";
      e.target.classList.remove("search-box-center");
      e.target.classList.add("search-box-top");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="search-box">
        <input
          className="search-box-center"
          name="searchData"
          value={this.state.searchData}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Search images"
          autoComplete="off"
        />
        <Gallery images={this.state.images} />
      </form>
    );
  }
}

export default Search;