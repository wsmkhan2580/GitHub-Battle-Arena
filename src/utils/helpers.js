export function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatShortDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatNumber(n) {
  if (n === null || n === undefined) return "0";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function calcTotalStars(repos) {
  return repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
}

export function getTopRepos(repos, count = 5) {
  return [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, count);
}

export function getErrorMessage(err) {
  if (err.message === "USER_NOT_FOUND") return "User not found. Check the username and try again.";
  if (err.message === "NETWORK_ERROR") return "Network error. Please check your connection.";
  return "Something went wrong. Please try again.";
}
