const API = "https://syntecxhubexpensetracker-production.up.railway.app";

// GET all expenses
export const getExpenses = async () => {
  const res = await fetch(`${API}/api/expenses`, {
    credentials: "include",
  });
  return res.json();
};

// ADD expense
export const addExpense = (data) => {
  return fetch(`${API}/api/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteExpense = async (id) => {
  await fetch(`${API}/api/expenses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const getUser = async () => {
  const res = await fetch(`${API}/auth/user`, {
    credentials: "include",
  });
  return res.json();
};