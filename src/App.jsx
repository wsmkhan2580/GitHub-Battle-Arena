import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import Battle from "./components/Battle";
import ThemeToggle from "./components/ThemeToggle";
import { fetchUserWithRepos } from "./services/api";
import { getErrorMessage } from "./utils/helpers";
import "./style.css";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("gba-theme");
    return saved ? saved === "dark" : true;
  });
  const [mode, setMode] = useState("search"); // "search" | "battle"
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("gba-theme", isDark ? "dark" : "light");
  }, [isDark]);

  async function handleSearch(username) {
    setLoading(true);
    setError(null);
    setProfile(null);
    try {
      const data = await fetchUserWithRepos(username);
      setProfile(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function handleModeSwitch(newMode) {
    setMode(newMode);
    setProfile(null);
    setError(null);
  }

  return (
    <div className="app">
      {/* Background grid */}
      <div className="app__bg" aria-hidden="true">
        <div className="app__bg-grid" />
        <div className="app__bg-glow" />
      </div>

      <header className="header">
        <div className="header__logo">
          <span className="header__logo-icon">⚔</span>
          <div className="header__logo-text">
            <span className="header__logo-title">GitHub Battle</span>
            <span className="header__logo-sub">Arena</span>
          </div>
        </div>

        <nav className="header__nav">
          <button
            className={`header__nav-btn ${mode === "search" ? "header__nav-btn--active" : ""}`}
            onClick={() => handleModeSwitch("search")}
          >
            Search
          </button>
          <button
            className={`header__nav-btn ${mode === "battle" ? "header__nav-btn--active" : ""}`}
            onClick={() => handleModeSwitch("battle")}
          >
            ⚔ Battle
          </button>
        </nav>

        <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
      </header>

      <main className="main">
        {mode === "search" && (
          <section className="search-section">
            <div className="search-section__hero">
              <h1 className="search-section__headline">
                Explore GitHub Profiles
              </h1>
              <p className="search-section__sub">
                Search any developer. Inspect their stats, repos, and presence.
              </p>
            </div>

            <SearchBar onSearch={handleSearch} loading={loading} />

            {loading && (
              <div className="loading-state">
                <span className="spinner spinner--lg" />
                <span>Fetching profile...</span>
              </div>
            )}

            {error && !loading && (
              <div className="error-msg error-msg--center">{error}</div>
            )}

            {profile && !loading && (
              <div className="profile-section">
                <ProfileCard user={profile.user} repos={profile.repos} />
              </div>
            )}
          </section>
        )}

        {mode === "battle" && (
          <section className="battle-section">
            <div className="search-section__hero">
              <h1 className="search-section__headline">
                Battle Arena
              </h1>
              <p className="search-section__sub">
                Two developers enter. One leaves victorious.
              </p>
            </div>
            <Battle />
          </section>
        )}
      </main>

      <footer className="footer">
        <span>GitHub Battle Arena</span>
        <span className="footer__sep">·</span>
        <span>Powered by GitHub API</span>
        <span className="footer__sep">·</span>
        <a
          href="https://docs.github.com/en/rest"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          API Docs
        </a>
      </footer>
    </div>
  );
}
