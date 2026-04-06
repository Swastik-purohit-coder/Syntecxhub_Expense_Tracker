const Login = () => {
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
                <p className="text-sm font-medium text-slate-100">Secure Clerk login</p>
                <p className="mt-1 text-xs text-slate-300/80">Sign in securely with social or email options.</p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-8">
              <p className="text-sm font-medium text-slate-300/85">Welcome Back</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Sign in to continue</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
                Authentication is disabled. Open the dashboard directly to track your finances.
              </p>

              <a
                href="/"
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-blue-500/30 active:scale-[0.99]"
              >
                Open Dashboard
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;