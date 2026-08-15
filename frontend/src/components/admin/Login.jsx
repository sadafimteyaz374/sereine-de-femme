import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import Brand from "./Brand";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/admin/login", { email, password });
      if (response.data.success) {
        setIsLoggedIn(true);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 font-sans">
      {/* Left Side: Brand Intro */}
      <div className="w-full md:w-[38%] bg-brand-ink text-zinc-100 p-10 lg:p-14 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10">
          <Brand size="lg" variant="dark" />

          <div className="w-16 h-[2px] bg-brand-gold/70 my-8" />

          <div className="space-y-6 text-zinc-300 text-sm leading-relaxed tracking-wide">
            <p className="flex items-start gap-3">
              <span className="text-base">✨</span>
              <span>
                <strong className="text-white">Sereine De Femme</strong> — Timeless
                elegance for the modern woman.
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-base">💍</span>
              <span>Premium minimalist jewelry crafted to celebrate your inner grace.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-base">🛍️</span>
              <span>Elevating your everyday look with a touch of quiet luxury.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-[62%] flex items-center justify-center p-8 lg:p-16 bg-zinc-50">
        <div className="max-w-md w-full admin-card p-8 md:p-10">
          <h2 className="font-brand-serif text-2xl font-semibold text-zinc-900 mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-zinc-400 mb-8">Sign in to the admin portal</p>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs mb-6 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sereinedefemme.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 text-sm tracking-wide mt-2 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
