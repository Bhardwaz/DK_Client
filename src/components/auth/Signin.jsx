import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, signinUser } from "./authSlice";
import { Link, Navigate } from "react-router-dom";

export default function Signin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const status = useSelector(selectStatus);

  // Load saved credentials if available
  useEffect(() => {
    const savedInfo = localStorage.getItem("signinInfo");
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setEmail(parsed.email || "");
      setPassword(parsed.password || "");
      setRemember(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRememberLogic = () => {
    if (remember) {
      localStorage.setItem("signinInfo", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("signinInfo");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleRememberLogic();
      try {
        await dispatch(signinUser({ email, password }))
          .unwrap()
          .then(() => <Navigate to="/" replace />);
      } catch (error) {
        console.log(error, "login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm p-6 bg-base-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="label-text text-pink-600">
              Remember my credentials?
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center items-center"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>

          {/* Register link */}
          <p className="text-sm text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
