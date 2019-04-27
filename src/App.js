import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Article from "./Article";
// import { css } from "@emotion/core"; // for spinner
import { ClipLoader } from "react-spinners";
// https://www.npmjs.com/package/react-spinners

const SPINNER_SIZE_PX = 50;
// todo: how to handle stories missing a title or url? (example: search clockwork orange)
// todo: add link to today's stories

const spinnerCSS = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "fixed",
  top: "50%",
  left: "50%",
  marginTop: -(SPINNER_SIZE_PX / 2),
  marginLeft: -(SPINNER_SIZE_PX / 2)
};

function App() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("react hooks");
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const searchInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(textInput);
  }

  function handleClear(event) {
    setTextInput("");
    searchInputRef.current.focus();
  }

  const getArticles = async () => {
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${searchTerm}`
      );
      const articleList = response.data.hits;
      setArticles(articleList);
      document.title = `HN ${searchTerm}`;
      setIsLoading(false);
      setIsSpinning(false);
    } catch (err) {
      setLoadError(err);
      setIsSpinning(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      setIsSpinning(true);
      getArticles(); // moved out of effect because I want to use an async function
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      {isSpinning && (
        <div className="sweet-loading">
          <ClipLoader
            css={spinnerCSS}
            sizeUnit={"px"}
            size={SPINNER_SIZE_PX}
            color={"blue"}
            loading={isSpinning}
          />
        </div>
      )}
      <div style={{ padding: 20 }}>
        <h3
          style={{
            textAlign: "center",
            backgroundColor: "red",
            borderRadius: 3,
            marginBottom: 2,
            padding: 10
          }}
        >
          Hacker News Search
        </h3>
        <h5 style={{ textAlign: "center", marginTop: 2 }}>by Scott Ratigan</h5>
        <form onSubmit={handleSubmit}>
          <input
            style={{ margin: 10, borderRadius: 3 }}
            type="text"
            autoComplete="off"
            value={textInput}
            onChange={event => setTextInput(event.target.value)}
            ref={searchInputRef}
          />
          <button onClick={handleSubmit}>Search</button>
          <button
            type="button"
            onClick={handleClear}
            style={{ marginLeft: 10 }}
          >
            Clear
          </button>
        </form>
        <h4>
          {isLoading
            ? "Loading articles..."
            : `Displaying articles for ${searchTerm}`}
        </h4>
        <div
          style={{
            backgroundColor: "#eadcdf",
            borderRadius: 5,
            border: "1px solid grey",
            boxShadow: "5px 10px #888888"
          }}
        >
          {articles.map(article => {
            return (
              <Article
                key={article.objectID}
                data={article}
                setIsSpinning={setIsSpinning}
              />
            );
          })}
          {loadError && <p>Error loading articles: {loadError.message}</p>}
        </div>
        <h6 style={{ textAlign: "center" }}>
          Data supplied by{" "}
          <a
            href="https://news.ycombinator.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hacker News
          </a>
        </h6>
      </div>
    </>
  );
}

export default App;
