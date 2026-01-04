import React from "react";
import "./App.css";
import Gallery from "./Gallery";
import Hero from "./Hero";

const Search = () => {
  const [searchData, setSearchData] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isSearched, setIsSearched] = React.useState(false);

  const perPage = 24;
  const apiUrl = process.env.REACT_APP_PIXABAY_API_URL;
  const apiToken = process.env.REACT_APP_PIXABAY_API_KEY;

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setIsSearched(true);

    // Legacy DOM manipulation removed

    fetch(
      `${apiUrl}/?key=${apiToken}&q=${searchData}&image_type=photo&per_page=${perPage}&safesearch=true`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        const hits = data.hits.map(hit => ({
          image: hit.webformatURL,
          id: hit.id,
          tags: hit.tags,
          user: hit.user,
          userImg: hit.userImageURL
        }));
        setImages(hits);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError("Failed to fetch images. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div>
      {!isSearched && <Hero />}
      <form onSubmit={handleSubmit} id="search-box">
        <input
          className={`search-box-center ${isSearched ? "active" : ""}`}
          name="searchData"
          value={searchData}
          onChange={handleChange}
          placeholder="Search images"
          autoComplete="off"
        />
      </form>
      {isSearched && (
        <>
          {loading && <p style={{ textAlign: "center", fontSize: "1.5rem", marginTop: "20px" }}>Loading...</p>}
          {error && <p style={{ textAlign: "center", color: "red", fontSize: "1.2rem", marginTop: "20px" }}>{error}</p>}
          <Gallery images={images} />
        </>
      )}
    </div>
  );
};

export default Search;