import React, { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__inner">
        <span className="search-bar__icon">⌕</span>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Enter GitHub username..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          autoComplete="off"
          spellCheck="false"
        />
        <button
          className="search-bar__btn"
          type="submit"
          disabled={loading || !value.trim()}
        >
          {loading ? <span className="spinner" /> : "SEARCH"}
        </button>
      </div>
    </form>
  );
}
