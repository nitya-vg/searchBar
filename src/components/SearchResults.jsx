import React from "react";

const SearchResults = ({ results }) => {
  return (
    results.length > 0 && (
      <div className="search-results">
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> ({item.email})
              <p>{item.body.length > 64 ? item.body.substring(0, 64) + "..." : item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SearchResults;