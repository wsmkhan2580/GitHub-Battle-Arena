const BASE_URL = "https://api.github.com";

export async function fetchUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`);
  if (res.status === 404) throw new Error("USER_NOT_FOUND");
  if (!res.ok) throw new Error("NETWORK_ERROR");
  return res.json();
}

export async function fetchRepos(reposUrl) {
  const res = await fetch(`${reposUrl}?per_page=100&sort=updated`);
  if (!res.ok) throw new Error("NETWORK_ERROR");
  return res.json();
}

export async function fetchUserWithRepos(username) {
  const user = await fetchUser(username);
  const repos = await fetchRepos(user.repos_url);
  return { user, repos };
}

export async function fetchBothUsers(username1, username2) {
  return Promise.all([
    fetchUserWithRepos(username1),
    fetchUserWithRepos(username2),
  ]);
}
