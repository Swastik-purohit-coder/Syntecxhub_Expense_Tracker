// This frontend uses Create React App (react-scripts), so use REACT_APP_* env vars.
const API = (
  process.env.REACT_APP_API_URL ||
  "https://syntecxhubexpensetracker-production.up.railway.app/api"
).replace(/\/+$/, "");

console.log("API:", API);

const API_ROOT = API.endsWith("/api") ? API.slice(0, -4) : API;

const request = async (path, { method = "GET", body, baseUrl = API } = {}) => {
  const headers = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  let data;
  if (isJson) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message =
      (typeof data === "object" && data && (data.error || data.message)) ||
      (typeof data === "string" ? data : "") ||
      `Request failed with status ${res.status}`;
    throw new Error(message || "API failed");
  }

  return data;
};

export const getExpenses = () => {
  return request("/expenses");
};

export const addExpense = (data) => {
  return request("/expenses/add", {
    method: "POST",
    body: data,
  });
};

export const deleteExpense = (id) => {
  return request(`/expenses/${id}`, {
    method: "DELETE",
  });
};

export const getUser = () => {
  return request("/auth/user", { baseUrl: API_ROOT });
};