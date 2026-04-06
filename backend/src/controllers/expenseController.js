const pool = require("../config/db");

const resolveUserId = (req) =>
  String((req.user && req.user.id) || process.env.GUEST_USER_ID || "1");

const addExpense = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const { title, amount, category, type } = req.body;

    const result = await pool.query(
      "INSERT INTO expenses (user_id, title, amount, category, type) VALUES ($1, $2, $3, $4, $5)",
      [userId, title, amount, category, type]
    );

    res.json({ message: "Expense added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add expense" });
  }
  
};

const getExpenses = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const { id } = req.params;

    await pool.query("DELETE FROM expenses WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

module.exports = { addExpense, getExpenses, deleteExpense };