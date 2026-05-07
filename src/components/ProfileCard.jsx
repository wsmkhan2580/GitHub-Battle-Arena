import React from "react";
import RepoList from "./RepoList";
import { formatDate, formatNumber, calcTotalStars } from "../utils/helpers";

export default function ProfileCard({ user, repos, highlight, label }) {
  const totalStars = calcTotalStars(repos);

  const highlightClass =
    highlight === "winner"
      ? "profile-card--winner"
      : highlight === "loser"
      ? "profile-card--loser"
      : "";

  return (
    <div className={`profile-card ${highlightClass}`}>
      {label && (
        <div className={`profile-card__badge profile-card__badge--${highlight}`}>
          {highlight === "winner" ? "⚔ WINNER" : "✗ DEFEATED"}
        </div>
      )}

      <div className="profile-card__header">
        <div className="profile-card__avatar-wrap">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="profile-card__avatar"
          />
        </div>
        <div className="profile-card__identity">
          <h2 className="profile-card__name">{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-card__login"
          >
            @{user.login}
          </a>
          {user.bio && <p className="profile-card__bio">{user.bio}</p>}
        </div>
      </div>

      <div className="profile-card__stats">
        <div className="profile-card__stat">
          <span className="profile-card__stat-value">{formatNumber(user.followers)}</span>
          <span className="profile-card__stat-label">Followers</span>
        </div>
        <div className="profile-card__stat">
          <span className="profile-card__stat-value">{formatNumber(user.following)}</span>
          <span className="profile-card__stat-label">Following</span>
        </div>
        <div className="profile-card__stat">
          <span className="profile-card__stat-value">{formatNumber(user.public_repos)}</span>
          <span className="profile-card__stat-label">Repos</span>
        </div>
        <div className="profile-card__stat">
          <span className="profile-card__stat-value">{formatNumber(totalStars)}</span>
          <span className="profile-card__stat-label">Total Stars</span>
        </div>
      </div>

      <div className="profile-card__meta">
        {user.blog && (
          <a
            href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-card__meta-item profile-card__meta-link"
          >
            <span>🔗</span>
            <span className="profile-card__meta-text">{user.blog}</span>
          </a>
        )}
        <div className="profile-card__meta-item">
          <span>◷</span>
          <span className="profile-card__meta-text">
            Joined {formatDate(user.created_at)}
          </span>
        </div>
      </div>

      <RepoList repos={repos} />
    </div>
  );
}
