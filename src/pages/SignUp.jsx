import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coinbaseLogo from "../assets/coinbase_logo@2x.png";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = "https://crypto-school-project-backend.onrender.com";

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password) {
      setError("Please enter your name, email, and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully");
        navigate("/signin");
      } else {
        setError(data.msg || "Registration failed.");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#05080f] px-5 py-8 text-slate-100">
      <Link to="/" className="inline-block" aria-label="Coinbase home">
        <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
      </Link>

      <div className="mx-auto mt-10 w-full max-w-[560px]">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Create an account</h1>
        <p className="mt-3 text-sm text-slate-400 sm:text-base">Sign up with your name, email, and password.</p>

        <div className="mt-6 rounded-3xl border border-slate-700 bg-[#121827] p-8 shadow-xl shadow-slate-950/30">
          <form className="space-y-5" onSubmit={handleRegister}>
            <label className="block text-sm font-semibold text-slate-200">
              Full name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-[#141b2e] px-4 py-3 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-200">
              Email address
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
                placeholder="Create a strong password"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-[#141b2e] px-4 py-3 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
            </label>

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-[999px] bg-[#4052d2] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a5de2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-[#0b5cff] hover:text-[#2d74ff]">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
 