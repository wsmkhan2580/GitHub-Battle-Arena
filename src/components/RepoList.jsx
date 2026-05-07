import React from "react";
import { getTopRepos, formatShortDate } from "../utils/helpers";

export default function RepoList({ repos }) {
  const top = getTopRepos(repos, 5);

  if (!top.length) {
    return <p className="repo-list__empty">No public repositories.</p>;
  }

  return (
    <div className="repo-list">
      <h3 className="repo-list__title">
        <span className="repo-list__title-icon">⬡</span> Top Repositories
      </h3>
      <ul className="repo-list__items">
        {top.map((repo) => (
          <li key={repo.id} className="repo-list__item">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-list__name"
            >
              {repo.name}
            </a>
            <div className="repo-list__meta">
              <span className="repo-list__stars">
                ★ {repo.stargazers_count.toLocaleString()}
              </span>
              <span className="repo-list__updated">
                {formatShortDate(repo.updated_at)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
