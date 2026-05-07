import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { fetchBothUsers } from "../services/api";
import { calcTotalStars, getErrorMessage } from "../utils/helpers";

function BattleInput({ label, value, onChange, disabled }) {
  return (
    <div className="battle-input">
      <label className="battle-input__label">{label}</label>
      <div className="battle-input__inner">
        <span className="battle-input__icon">⌕</span>
        <input
          className="battle-input__field"
          type="text"
          placeholder="GitHub username..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

function ScoreBattle({ p1, p2 }) {
  const stars1 = calcTotalStars(p1.repos);
  const stars2 = calcTotalStars(p2.repos);

  const follWinner =
    p1.user.followers > p2.user.followers
      ? "p1"
      : p2.user.followers > p1.user.followers
      ? "p2"
      : "tie";

  const starWinner =
    stars1 > stars2 ? "p1" : stars2 > stars1 ? "p2" : "tie";

  const score1 = (follWinner === "p1" ? 1 : 0) + (starWinner === "p1" ? 1 : 0);
  const score2 = (follWinner === "p2" ? 1 : 0) + (starWinner === "p2" ? 1 : 0);

  return (
    <div className="score-battle">
      <h2 className="score-battle__title">⚔ Battle Results</h2>
      <div className="score-battle__table">
        <div className="score-battle__row score-battle__row--header">
          <span>Metric</span>
          <span>{p1.user.login}</span>
          <span>{p2.user.login}</span>
        </div>
        <div className="score-battle__row">
          <span>Followers</span>
          <span className={follWinner === "p1" ? "score-win" : follWinner === "p2" ? "score-lose" : ""}>
            {p1.user.followers.toLocaleString()}
          </span>
          <span className={follWinner === "p2" ? "score-win" : follWinner === "p1" ? "score-lose" : ""}>
            {p2.user.followers.toLocaleString()}
          </span>
        </div>
        <div className="score-battle__row">
          <span>Total Stars</span>
          <span className={starWinner === "p1" ? "score-win" : starWinner === "p2" ? "score-lose" : ""}>
            {stars1.toLocaleString()}
          </span>
          <span className={starWinner === "p2" ? "score-win" : starWinner === "p1" ? "score-lose" : ""}>
            {stars2.toLocaleString()}
          </span>
        </div>
        <div className="score-battle__row score-battle__row--total">
          <span>Score</span>
          <span className={score1 > score2 ? "score-win" : score1 < score2 ? "score-lose" : ""}>{score1} / 2</span>
          <span className={score2 > score1 ? "score-win" : score2 < score1 ? "score-lose" : ""}>{score2} / 2</span>
        </div>
      </div>
    </div>
  );
}

export default function Battle() {
  const [u1, setU1] = useState("");
  const [u2, setU2] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleBattle(e) {
    e.preventDefault();
    if (!u1.trim() || !u2.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const [p1, p2] = await fetchBothUsers(u1.trim(), u2.trim());
      setResults({ p1, p2 });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResults(null);
    setError(null);
    setU1("");
    setU2("");
  }

  const winner =
    results
      ? (() => {
          const s1 = calcTotalStars(results.p1.repos);
          const s2 = calcTotalStars(results.p2.repos);
          const score1 =
            (results.p1.user.followers > results.p2.user.followers ? 1 : 0) +
            (s1 > s2 ? 1 : 0);
          const score2 =
            (results.p2.user.followers > results.p1.user.followers ? 1 : 0) +
            (s2 > s1 ? 1 : 0);
          if (score1 > score2) return "p1";
          if (score2 > score1) return "p2";
          return "tie";
        })()
      : null;

  return (
    <div className="battle">
      {!results && (
        <form className="battle__form" onSubmit={handleBattle}>
          <div className="battle__inputs">
            <BattleInput
              label="⚔ Fighter 1"
              value={u1}
              onChange={setU1}
              disabled={loading}
            />
            <div className="battle__vs">VS</div>
            <BattleInput
              label="⚔ Fighter 2"
              value={u2}
              onChange={setU2}
              disabled={loading}
            />
          </div>
          <button
            className="battle__btn"
            type="submit"
            disabled={loading || !u1.trim() || !u2.trim()}
          >
            {loading ? <><span className="spinner" /> Fetching...</> : "START BATTLE ⚔"}
          </button>
          {error && <div className="error-msg">{error}</div>}
        </form>
      )}

      {results && (
        <div className="battle__results">
          <ScoreBattle p1={results.p1} p2={results.p2} />
          <div className="battle__cards">
            <ProfileCard
              user={results.p1.user}
              repos={results.p1.repos}
              highlight={winner === "p1" ? "winner" : winner === "p2" ? "loser" : null}
              label={true}
            />
            <ProfileCard
              user={results.p2.user}
              repos={results.p2.repos}
              highlight={winner === "p2" ? "winner" : winner === "p1" ? "loser" : null}
              label={true}
            />
          </div>
          <button className="battle__reset-btn" onClick={handleReset}>
            ← New Battle
          </button>
        </div>
      )}
    </div>
  );
}
