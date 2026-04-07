import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { getExpenses, addExpense, deleteExpense } from "../services/api";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [filterType, setFilterType] = useState("all");
  const category = "General";
  const titleRef = useRef(null);
  const safeExpenses = useMemo(() => (Array.isArray(expenses) ? expenses : []), [expenses]);

  const fetchExpenses = useCallback(async () => {
    try {
      const data = await getExpenses();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleAddExpense = useCallback(async () => {
    if (!title || !amount) return;

    await addExpense({
      title,
      amount: Number(amount),
      category,
      type,
    });

    setTitle("");
    setAmount("");

    if (titleRef.current) {
      titleRef.current.focus();
    }

    fetchExpenses(); // refresh UI
  }, [title, amount, category, type, fetchExpenses]);

  const handleDelete = useCallback(
    async (id) => {
      await deleteExpense(id);
      fetchExpenses();
    },
    [fetchExpenses]
  );

  const totalIncome = useMemo(() => {
    return safeExpenses
      .filter((item) => item.type === "income")
      .reduce((acc, item) => acc + Number(item.amount), 0);
  }, [safeExpenses]);

  const totalExpense = useMemo(() => {
    return safeExpenses
      .filter((item) => item.type === "expense")
      .reduce((acc, item) => acc + Number(item.amount), 0);
  }, [safeExpenses]);

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  const filteredExpenses = safeExpenses.filter((item) => {
    const typeMatch = filterType === "all" || item.type === filterType;

    return typeMatch;
  });

  const handlePageRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-20 left-8 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-6 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-slate-300/80">Financial overview</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Expense Tracker Dashboard</h1>
          </div>

          <button
            onClick={handlePageRefresh}
            className="rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200 shadow-lg shadow-cyan-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-500/30 hover:text-cyan-100 active:scale-[0.98]"
          >
            Refresh
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          <div className="group rounded-2xl border border-indigo-300/20 bg-gradient-to-br from-indigo-400/20 via-slate-900/70 to-slate-900/60 p-5 shadow-xl shadow-indigo-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-indigo-500/20">
            <div className="mb-3 flex items-center gap-2 text-indigo-200/90">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 10h18M7 15h1m4 0h5" strokeLinecap="round" />
                <rect x="2" y="5" width="20" height="14" rx="3" />
              </svg>
              <h2 className="text-sm font-medium">Total Balance</h2>
            </div>
            <p className="text-3xl font-semibold text-indigo-100">₹ {totalBalance}</p>
          </div>

          <div className="group rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-emerald-400/15 via-slate-900/70 to-slate-900/60 p-5 shadow-xl shadow-emerald-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-emerald-500/20 md:mt-3">
            <div className="mb-3 flex items-center gap-2 text-emerald-200/90">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 19V5m0 0-5 5m5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-sm font-medium">Income</h2>
            </div>
            <p className="text-3xl font-semibold text-emerald-300">₹ {totalIncome}</p>
          </div>

          <div className="group rounded-2xl border border-rose-300/20 bg-gradient-to-br from-rose-400/15 via-slate-900/70 to-slate-900/60 p-5 shadow-xl shadow-rose-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-rose-500/20">
            <div className="mb-3 flex items-center gap-2 text-rose-200/90">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 5v14m0 0-5-5m5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-sm font-medium">Expense</h2>
            </div>
            <p className="text-3xl font-semibold text-rose-300">₹ {totalExpense}</p>
          </div>
        </div>

        <div className="mb-7 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">Cashflow Snapshot</h3>
            <span className="text-xs text-slate-300/80">Income vs Expense</span>
          </div>
          <ExpenseChart income={totalIncome} expense={totalExpense} />
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-100">Add Transaction</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              className="md:col-span-4 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              className="md:col-span-3 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="md:col-span-3 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              onClick={handleAddExpense}
              className="md:col-span-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-900/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/30 active:scale-[0.98]"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 sm:w-44"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">Recent Transactions</h3>
            <span className="text-xs text-slate-300/80">{safeExpenses.length} items</span>
          </div>

          {safeExpenses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-4 py-10 text-center">
              <p className="text-base font-medium text-slate-200">No transactions yet</p>
              <p className="mt-1 text-sm text-slate-400">Add your first income or expense to get started.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {filteredExpenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-slate-900/80"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          exp.type === "income" ? "bg-emerald-400" : "bg-rose-400"
                        }`}
                      />
                      <span className="font-medium text-slate-100">{exp.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={exp.type === "income" ? "font-semibold text-green-400" : "font-semibold text-red-400"}>
                        ₹ {exp.amount}
                      </span>

                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="rounded-lg border border-rose-400/30 bg-rose-500/15 px-3 py-1.5 text-sm font-medium text-rose-300 transition duration-200 hover:bg-rose-500/30 hover:text-rose-100 active:scale-[0.98]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredExpenses.length === 0 && (
                <p className="mt-4 text-sm text-slate-400">
                  No matching expenses found
                </p>
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;