import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const ExpenseChart = ({ income, expense }) => {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-4 backdrop-blur-xl">
      <h2 className="mb-4 text-sm font-medium tracking-wide text-slate-300">Overview</h2>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={88}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                borderRadius: "12px",
                color: "#e2e8f0",
              }}
              formatter={(value) => `₹ ${value}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-300/90">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          Income
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          Expense
        </span>
      </div>
    </div>
  );
};

export default ExpenseChart;