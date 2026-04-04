import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { getUser } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-200">
        <div className="pointer-events-none absolute -top-24 left-10 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-6 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="relative rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;