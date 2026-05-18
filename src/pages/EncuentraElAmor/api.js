const BASE_URL = "";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

export const register = (body) =>
  apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(body) });

export const login = (body) =>
  apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(body) });

export const updateProfile = (userId, body) =>
  apiFetch("/api/users/profile", { method: "PATCH", body: JSON.stringify({ userId, ...body }) });

export const getCandidates = (userId) =>
  apiFetch(`/api/candidates?userId=${userId}`);

export const likeUser = (fromId, toId, esLike) =>
  apiFetch("/api/likes", { method: "POST", body: JSON.stringify({ fromUserId: fromId, toUserId: toId, esLike }) });

export const getMatches = (userId) =>
  apiFetch(`/api/matches?userId=${userId}`);

export const getMessages = (matchId, userId, afterId = null) => {
  const params = new URLSearchParams({ matchId, userId: String(userId) });
  if (afterId != null) params.set("afterId", String(afterId));
  return apiFetch(`/api/messages?${params}`);
};

export const pollMessages = (matchId, userId, afterId) =>
  apiFetch(`/api/messages/poll?matchId=${matchId}&userId=${userId}&afterId=${afterId}`);

export const sendMessage = (matchId, senderId, content) =>
  apiFetch("/api/messages", { method: "POST", body: JSON.stringify({ matchId, senderId, content }) });
