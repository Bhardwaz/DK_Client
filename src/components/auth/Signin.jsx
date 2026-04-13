import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, signinUser } from "./authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("signinInfo");
    if (saved) {
      const { email: e, password: p } = JSON.parse(saved);
      setEmail(e || ""); setPassword(p || ""); setRemember(true);
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!password.trim()) e.password = "Password is required";
    else if (password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (remember) localStorage.setItem("signinInfo", JSON.stringify({ email, password }));
    else localStorage.removeItem("signinInfo");
    try {
      await dispatch(signinUser({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "24px 16px",
    }}>
      {/* Glow */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,67,147,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="fade-up" style={{ width: "100%", maxWidth: "360px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "38px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            date<span style={{ color: "var(--pink)" }}>karle</span>
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-3)", marginTop: "6px" }}>Welcome back.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Email */}
          <div>
            <input
              className="input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={errors.email ? { borderColor: "#f87171" } : {}}
            />
            {errors.email && <p style={{ fontSize: "12px", color: "#f87171", marginTop: "5px" }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <input
              className="input"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: "48px", ...(errors.password ? { borderColor: "#f87171" } : {}) }}
            />
            <button type="button" onClick={() => setShowPass(p => !p)} style={{
              position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", color: "var(--text-3)", cursor: "pointer", fontSize: "12px",
            }}>
              {showPass ? "Hide" : "Show"}
            </button>
            {errors.password && <p style={{ fontSize: "12px", color: "#f87171", marginTop: "5px" }}>{errors.password}</p>}
          </div>

          {/* Remember */}
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
            <div
              onClick={() => setRemember(p => !p)}
              style={{
                width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0,
                border: `2px solid ${remember ? "var(--pink)" : "var(--border-hover)"}`,
                background: remember ? "var(--pink)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}
            >
              {remember && <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <span style={{ fontSize: "13px", color: "var(--text-2)" }}>Remember me</span>
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "loading"}
            style={{ width: "100%", padding: "14px", fontSize: "15px", marginTop: "8px", justifyContent: "center" }}
          >
            {status === "loading"
              ? <svg className="spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a10 10 0 0110 10"/></svg>
              : "Sign In"
            }
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-3)", marginTop: "8px" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--pink)", textDecoration: "none", fontWeight: 600 }}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
