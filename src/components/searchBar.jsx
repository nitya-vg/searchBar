import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import SearchResults from "./SearchResults";
import NoResultsImage from "../assets/NoResults.jpg";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const enableSearchButton = query.length > 3;
  const debouncedFetchResults = useRef(null);

  // Debounced function for typeahead suggestions
  useEffect(() => {
    debouncedFetchResults.current = debounce(async (searchText) => {
      if (searchText.length > 3) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/comments?q=${searchText}`);
          const data = await response.json();
          setSuggestions(data.slice(0, 5)); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  // Fetch suggestions as user types
  useEffect(() => {
    debouncedFetchResults.current(query);
  }, [query]);

  useEffect(() => {
    setSearchClicked(false);
  }, [query]);

  // Fetch search results on button click
  const handleSearch = async () => {
    if (query.length > 3) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?q=${query}`);
        const data = await response.json();
        setResults(data.slice(0, 20)); // Show only top 20 results
        setSuggestions([]); // Clear suggestions after searching
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
    setSearchClicked(true);
  };

  return (
    <div className="search-container">
        <div className="search-container-one">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the name here..."
            className="search-box"
            />
           <button disabled={query.length < 4} onClick={handleSearch} className="search-button">Search</button>
        </div>

        {/* Display Suggestions Below Search Bar */}
        {suggestions.length > 0 && (
            <ul className="suggestions">
            {suggestions.map((item) => (
                <li key={item.id} onClick={() => setQuery(item.name)}>
                {item.name}
                </li>
            ))}
            </ul>
        )}
         {results.length > 0 ? (
        <SearchResults results={results} />
      ) : (
        query.length >= 4 && results.length === 0 && searchClicked && <img className="no-results" src={NoResultsImage} alt="No Results" />
      )}
    </div>
  );
};

export default SearchBar;

