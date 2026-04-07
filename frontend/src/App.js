import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";

const signInAppearance = {
  variables: {
    fontFamily: '"Outfit", "Segoe UI", sans-serif',
    colorPrimary: "#22d3ee",
    colorText: "#e2e8f0",
    colorBackground: "transparent",
    colorInputText: "#e2e8f0",
    colorInputBackground: "rgba(15, 23, 42, 0.85)",
    borderRadius: "0.85rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    card: "w-full bg-transparent shadow-none border-0",
    headerTitle: "text-slate-100",
    headerSubtitle: "text-slate-400",
    badge: "hidden",
    socialButtonsBlockButtonArrow: "hidden",
    dividerRow: "hidden",
    dividerLine: "hidden",
    dividerText: "hidden",
    socialButtonsBlockButton:
      "bg-slate-900/75 border border-slate-700 text-slate-100 hover:bg-slate-800",
    socialButtonsBlockButtonText: "text-slate-100",
    formFieldInput:
      "bg-slate-900/80 border border-slate-700 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400",
    formButtonPrimary:
      "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold hover:from-cyan-300 hover:to-blue-400",
    footerActionLink: "text-cyan-300 hover:text-cyan-200",
    footer: "bg-transparent",
  },
};

function App() {
  return (
    <>
      <SignedOut>
        <div className="relative min-h-screen overflow-hidden bg-[#060b16] text-slate-100">
          <div className="auth-grid-pattern pointer-events-none absolute inset-0" />
          <div className="auth-float-y pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="auth-float-x pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="auth-float-y pointer-events-none absolute bottom-0 right-24 h-72 w-72 rounded-full bg-orange-300/15 blur-3xl" />

          <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-start px-3 py-5 sm:px-6 sm:py-8 lg:items-center lg:px-8">
            <div className="grid w-full gap-4 rounded-3xl border border-white/10 bg-slate-950/45 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl sm:gap-6 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:p-8">
              <section className="order-2 rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-500/10 via-slate-900/65 to-slate-900/90 p-5 sm:p-8 lg:order-1">
                <p className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/15 px-3 py-1 text-xs font-medium tracking-wide text-cyan-100">
                  Expense Tracker
                </p>

                <h1 className="auth-display mt-4 text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Track money without
                  <br />
                  the usual chaos.
                </h1>

                <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                  Sign in to monitor spending, balance income vs expense, and keep a clean
                  snapshot of your monthly cash flow.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:max-w-md sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-semibold text-cyan-200">Fast Entry</p>
                    <p className="mt-1 text-xs text-slate-300">Add transactions in seconds</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-semibold text-indigo-200">Smart View</p>
                    <p className="mt-1 text-xs text-slate-300">Instant income vs expense insight</p>
                  </div>
                </div>
              </section>

              <section className="order-1 mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/60 p-2 shadow-xl shadow-cyan-950/20 sm:p-3 lg:order-2 lg:max-w-none">
                <div className="rounded-xl bg-slate-950/70 p-1 sm:p-2">
                  <SignIn appearance={signInAppearance} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="relative">
          <div className="fixed bottom-3 right-3 top-auto z-50 rounded-full border border-white/20 bg-slate-900/80 p-1.5 shadow-lg shadow-black/30 backdrop-blur sm:bottom-auto sm:right-4 sm:top-4">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Dashboard />
        </div>
      </SignedIn>
    </>
  );
}

export default App;