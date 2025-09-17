import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectStatus, signupUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import { fetchUploadUrl } from "../pages/profile/profileSlice";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    interestIn: [],
    birthday: "",
    desiredAgeRange: {
      min: 0,
      max: 0,
    },
    bio: "",
    location: "",
    skills: "",
    mainPhoto: null,
    file: null,
    uploadUrl: null
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Handle input changes
  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      const updated = checked
        ? [...formData.interestIn, value]
        : formData.interestIn.filter((v) => v !== value);
      setFormData({ ...formData, interestIn: updated });
    } else if (type === "file") {
      const file = files[0];
      const { uploadUrl, fileUrl } = await fetchUploadUrl(file.type)
      setFormData({ ...formData, mainPhoto: fileUrl });
      setFormData({...formData, file})
      setFormData({...formData, uploadUrl})
      setPreview(URL.createObjectURL(file));
    } else if (name === "desiredAgeMin" || name === "desiredAgeMax") {
      setFormData({
        ...formData,
        desiredAgeRange: {
          ...formData.desiredAgeRange,
          [name === "desiredAgeMin" ? "min" : "max"]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Calculate age from birthday
  const calculateAge = (birthday) => {
    if (!birthday) return null;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // 🔹 Validate inputs
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Min 6 characters required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (formData.interestIn.length === 0)
      newErrors.interestIn = "Select at least one option";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.desiredAgeRange.min || isNaN(formData.desiredAgeRange.min))
      newErrors.desiredAgeMin = "Min age must be a number";
    if (!formData.desiredAgeRange.max || isNaN(formData.desiredAgeRange.max))
      newErrors.desiredAgeMax = "Max age must be a number";
    if(formData.desiredAgeRange.min < 18)
      newErrors.desiredAgeMin = "Min age must be above 18";
     if(formData.desiredAgeRange.max > 50)
      newErrors.desiredAgeMax = "Max age must be lower than 50";
    if (!formData.mainPhoto) newErrors.mainPhoto = "Upload a profile photo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const age = calculateAge(formData.birthday);
      const finalData = {
        ...formData,
        age,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
    
      try {
      const { uploadUrl, file } = formData
        await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });
        await dispatch(signupUser(finalData)).unwrap();
        navigate("/");
      } catch (error) {
        console.error(error.message, "error is here");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-lg p-6 bg-base-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Main Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Photo</span>
              )}
              <label
                htmlFor="mainPhoto"
                className="absolute bottom-2 right-2 bg-primary p-2 rounded-full cursor-pointer border-2 border-white shadow-md"
              >
                <Camera className="text-white w-5 h-5" />
              </label>
              <input
                type="file"
                id="mainPhoto"
                name="mainPhoto"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            {errors.mainPhoto && (
              <p className="text-error text-sm">{errors.mainPhoto}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`input input-bordered w-full ${
                  errors.firstName ? "input-error" : ""
                }`}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-error text-sm">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-error text-sm">{errors.email}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`input input-bordered w-full ${
              errors.password ? "input-error" : ""
            }`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-error text-sm">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`input input-bordered w-full ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-error text-sm">{errors.confirmPassword}</p>
          )}

          {/* Gender */}
          <div>
            <label className="label">Gender</label>
            <select
              name="gender"
              className={`select select-bordered w-full ${
                errors.gender ? "select-error" : ""
              }`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-error text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Interested In */}
          <div>
            <label className="label">Interested In</label>
            <div className="flex gap-4 flex-wrap">
              {["Male", "Female", "Other"].map((opt) => (
                <label key={opt} className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="interestIn"
                    value={opt}
                    checked={formData.interestIn.includes(opt)}
                    onChange={handleChange}
                    className="checkbox checkbox-primary mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {errors.interestIn && (
              <p className="text-error text-sm">{errors.interestIn}</p>
            )}
          </div>

          {/* Birthday */}
          <div>
            <label className="label">Birthday</label>
            <input
              type="date"
              name="birthday"
              className={`input input-bordered w-full ${
                errors.birthday ? "input-error" : ""
              }`}
              value={formData.birthday}
              onChange={handleChange}
            />
            {errors.birthday && (
              <p className="text-error text-sm">{errors.birthday}</p>
            )}
          </div>

          {/* Desired Age Range */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="desiredAgeMin"
              placeholder="Desired Min Age"
              className={`input input-bordered w-full ${
                errors.desiredAgeMin ? "input-error" : ""
              }`}
              value={formData.desiredAgeRange.min}
              onChange={handleChange}
            />
            <input
              type="number"
              name="desiredAgeMax"
              placeholder="Desired Max Age"
              className={`input input-bordered w-full ${
                errors.desiredAgeMax ? "input-error" : ""
              }`}
              value={formData.desiredAgeRange.max}
              onChange={handleChange}
            />
          </div>
          {errors.desiredAgeMin && (
            <p className="text-error text-sm">{errors.desiredAgeMin}</p>
          )}
          {errors.desiredAgeMax && (
            <p className="text-error text-sm">{errors.desiredAgeMax}</p>
          )}

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Short bio"
            className="textarea textarea-bordered w-full"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            className="input input-bordered w-full"
            value={formData.skills}
            onChange={handleChange}
          />

          {/* Submit */}
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
              "Sign up"
            )}
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
