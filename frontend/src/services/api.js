const BASE_URL = "http://localhost:5000/api";

// GET all expenses
export const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    credentials: "include",
  });
  return res.json();
};

// ADD expense
export const addExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/expenses/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id) => {
  await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const getUser = async () => {
  const res = await fetch("http://localhost:5000/auth/user", {
    credentials: "include",
  });
  return res.json();
};