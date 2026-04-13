import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectStatus, signupUser } from "./authSlice";

const Field = ({ label, error, children }) => (
  <div>
    {label && <p style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "6px", fontWeight: 500 }}>{label}</p>}
    {children}
    {error && <p style={{ fontSize: "12px", color: "#f87171", marginTop: "5px" }}>{error}</p>}
  </div>
);

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectStatus);

  const [form, setForm] = useState({
    firstName: "", lastName: "", emailId: "", password: "",
    gender: "", age: "", about: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.emailId.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) e.emailId = "Valid email required";
    if (!form.password || form.password.length < 6) e.password = "Min 6 characters";
    if (!form.gender) e.gender = "Required";
    if (!form.age || form.age < 18) e.age = "Must be 18+";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await dispatch(signupUser(form)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 16px",
    }}>
      <div style={{ position: "fixed", top: "15%", left: "50%", transform: "translateX(-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,67,147,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="fade-up" style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            date<span style={{ color: "var(--pink)" }}>karle</span>
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-3)", marginTop: "6px" }}>Create your profile.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Field error={errors.firstName}>
              <input className="input" placeholder="First name" value={form.firstName} onChange={set("firstName")} style={errors.firstName ? { borderColor: "#f87171" } : {}} />
            </Field>
            <Field>
              <input className="input" placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
            </Field>
          </div>

          <Field error={errors.emailId}>
            <input className="input" type="email" placeholder="Email address" value={form.emailId} onChange={set("emailId")} style={errors.emailId ? { borderColor: "#f87171" } : {}} />
          </Field>

          <Field error={errors.password}>
            <input className="input" type="password" placeholder="Password" value={form.password} onChange={set("password")} style={errors.password ? { borderColor: "#f87171" } : {}} />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Field error={errors.gender}>
              <select className="input" value={form.gender} onChange={set("gender")} style={errors.gender ? { borderColor: "#f87171" } : {}}>
                <option value="" disabled>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Other</option>
              </select>
            </Field>
            <Field error={errors.age}>
              <input className="input" type="number" placeholder="Age" value={form.age} onChange={set("age")} style={errors.age ? { borderColor: "#f87171" } : {}} />
            </Field>
          </div>

          <Field>
            <textarea className="input" rows={3} placeholder="A little about yourself..." value={form.about} onChange={set("about")} />
          </Field>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "loading"}
            style={{ width: "100%", padding: "14px", fontSize: "15px", marginTop: "4px", justifyContent: "center" }}
          >
            {status === "loading" ? "Creating account…" : "Create Account"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-3)", marginTop: "4px" }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "var(--pink)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
