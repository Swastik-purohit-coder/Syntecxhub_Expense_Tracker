const API =
  process.env.REACT_APP_API_URL ||
  "https://syntecxhubexpensetracker-production.up.railway.app";

const request = async (path, { method = "GET", body } = {}) => {
  const headers = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
};

export const getExpenses = () => {
  return request("/api/expenses");
};

export const addExpense = (data) => {
  return request("/api/expenses/add", {
    method: "POST",
    body: data,
  });
};

export const deleteExpense = (id) => {
  return request(`/api/expenses/${id}`, {
    method: "DELETE",
  });
};

export const getUser = () => {
  return request("/auth/user");
};