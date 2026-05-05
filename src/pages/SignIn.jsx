import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coinbaseLogo from "../assets/coinbase_logo@2x.png";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.65z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3c-1.07.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.1A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.32A7.2 7.2 0 0 1 4.94 12c0-.8.14-1.58.37-2.32V6.58H1.3A12 12 0 0 0 0 12c0 1.93.46 3.75 1.3 5.42l4.01-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.15 15.24 0 12 0A11.99 11.99 0 0 0 1.3 6.58l4.01 3.1c.94-2.83 3.58-4.91 6.69-4.91z"
      />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M16.9 12.8c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2-1.5 2.6-.4 6.5 1.1 8.7.8 1.1 1.6 2.4 2.8 2.4 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.6 1.2-2.7 0 0-2.5-1-2.5-3zM14.5 6.1c.6-.7 1.1-1.7 1-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 0 1.9-.5 2.5-1.2z" />
    </svg>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = "https://crypto-school-project-backend.onrender.com";

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError(null);

    if (!email.trim() || !password.trim()) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        setLoginError(data.message || data.msg || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setLoginError(err.message || "Unable to connect to the login service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#05080f] px-5 py-8 text-slate-100">
      <Link to="/" className="inline-block" aria-label="Coinbase home">
        <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
      </Link>

      <div className="mx-auto mt-10 w-full max-w-[460px]">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Sign in to Coinbase</h1>
        <p className="mt-3 text-sm text-slate-400 sm:text-base">Use your email and password to sign in.</p>

        <div className="mt-6 rounded-3xl border border-slate-700 bg-[#121827] p-8 shadow-xl shadow-slate-950/30">
          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block text-sm font-semibold text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-[#141b2e] px-4 py-3 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-200">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-[#141b2e] px-4 py-3 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
            </label>

            {loginError ? <p className="text-sm text-rose-400">{loginError}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-[999px] bg-[#4052d2] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a5de2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="my-6 flex items-center gap-3 text-sm text-slate-400">
          <span className="h-px flex-1 bg-slate-700" />
          <span>OR</span>
          <span className="h-px flex-1 bg-slate-700" />
        </div>

        <div className="space-y-4">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
          >
            <GoogleLogo />
            <span>Sign in with Google</span>
          </button>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
          >
            <AppleLogo />
            <span>Sign in with Apple</span>
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#0b5cff] hover:text-[#2d74ff]">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignIn;
