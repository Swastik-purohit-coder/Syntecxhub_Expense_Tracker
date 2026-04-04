const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -top-28 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-6 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <section className="lg:col-span-7 lg:pr-6">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
              Expense Tracker
            </p>

            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-5xl">
              Take Control of Your Finances
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
              Track your income and expenses, visualize spending, and manage your money smarter.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/40 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/10">
                <p className="text-sm font-medium text-slate-100">Smart expense tracking</p>
                <p className="mt-1 text-xs text-slate-300/80">Capture daily spending with minimal effort.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/40 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:mt-4">
                <p className="text-sm font-medium text-slate-100">Visual insights (charts)</p>
                <p className="mt-1 text-xs text-slate-300/80">Understand patterns through clear breakdowns.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/40 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:col-span-2 sm:max-w-sm">
                <p className="text-sm font-medium text-slate-100">Secure Google login</p>
                <p className="mt-1 text-xs text-slate-300/80">Sign in quickly using your trusted account.</p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-8">
              <p className="text-sm font-medium text-slate-300/85">Welcome Back</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Sign in to continue</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
                Access your dashboard and keep your financial activity in one place.
              </p>

              <button
                onClick={handleLogin}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-blue-500/30 active:scale-[0.99]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.2-1.9 3l3.1 2.4c1.8-1.7 2.9-4.2 2.9-7.2 0-.7-.1-1.4-.2-2H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 22c2.6 0 4.9-.9 6.6-2.4l-3.1-2.4c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3l-3.2 2.5C4.8 19.7 8.1 22 12 22z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M6.2 13.8c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8L3 7.7C2.4 8.9 2 10.4 2 12s.4 3.1 1 4.3l3.2-2.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 5.9c1.4 0 2.7.5 3.7 1.4l2.8-2.8C16.9 3 14.6 2 12 2 8.1 2 4.8 4.3 3 7.7l3.2 2.5C7 7.7 9.3 5.9 12 5.9z"
                  />
                </svg>
                Login with Google
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;