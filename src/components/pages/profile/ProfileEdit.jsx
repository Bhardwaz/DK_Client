// src/pages/profile/edit.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile,
  fetchUploadUrl,
  deletePhoto,
  selectPhotos,
  addPhoto,
  fetchProfile,
  setMain,
} from "./profileSlice";
import axios from "axios";
import { selectUser } from "../../auth/authSlice";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const getModified = (original, updated) => {
  const modified = {};

  for (const key in updated) {
    const newValue = updated[key];
    const oldValue = original[key];

    if (Array.isArray(newValue) && Array.isArray(oldValue)) {
      if (
        JSON.stringify(newValue) !== JSON.stringify(oldValue) &&
        newValue.length !== 0
      ) {
        modified[key] = newValue;
      }
      continue;
    }

    if (
      !Array.isArray(newValue) &&
      !Array.isArray(oldValue) &&
      oldValue !== newValue &&
      newValue !== ""
    )
      modified[key] = newValue;
  }
  return modified;
};

export default function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    photoUrl: [],
    gender: "",
    age: "",
    about: "",
    skills: "",
    sexualOrientation: "",
  });
  const user = useSelector(selectUser);

  const [mainPhoto, setMainPhoto] = useState(user?.mainPhoto);

  const uploadToS3 = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { uploadUrl, fileUrl } = await fetchUploadUrl(file.type);

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      dispatch(addPhoto(fileUrl));
    } catch (error) {
      console.log(error.message, "failed in file upload");
    }
  };

  useEffect(() => {
    if (photos.length === 0) dispatch(fetchProfile(id));
  }, [dispatch, id]);

  const deletingPhoto = (fileUrl) => {
    dispatch(deletePhoto(fileUrl));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const modified = getModified(user, form);
    if (Object.keys(modified).length === 0) return;
    dispatch(editProfile(modified));
    navigate(`/profile/view/${user._id}`);
  };

  const setAsMain = async (photo) => {
    setMainPhoto(photo);
    dispatch(setMain(photo));

    const promise = axiosInstance.post("/set-main", {
      data: { fileUrl: photo },
    });

    await toast.promise(promise, {
      loading: "Setting as Profile Picture",
      success: "Set as Profile Picture",
      error: "Failed Setting Profile Picture",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-lg bg-base-100 p-8 shadow-xl space-y-4"
      >
        <div>
          <Link to={`/profile/view/${user._id}`} className="btn btn-ghost">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
        </div>

        <div className="relative w-40 h-40 mx-auto">
          <img
            src={mainPhoto}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />

          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            className="absolute bottom-2 z-10 right-2 btn btn-sm btn-primary w-12 cursor-pointer opacity-0"
            onChange={(e) => uploadToS3(e)}
          />

          <button
            aria-label="Replace main photo"
            className="absolute bottom-2 right-2 btn btn-sm btn-primary rounded-full"
            type="button"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {photos &&
            photos.map((photo, idx) => (
              <div
                key={idx}
                className="relative group flex flex-col items-center"
              >
                <img
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80"
                />
                <div className="flex gap-1 mt-1">
                  <button
                    type="button"
                    className="btn btn-xs btn-success"
                    onClick={() => setAsMain(photo)}
                  >
                    Set as Main
                  </button>
                  <button
                    type="button"
                    className="btn btn-xs btn-error"
                    onClick={() => deletingPhoto(photo)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* === Rest of Form === */}
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-1/2"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-1/2"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          name="emailId"
          placeholder="Email Address"
          className="input input-bordered w-full"
          value={form.emailId}
          onChange={handleChange}
        />

        <input
          type="url"
          name="photoUrl"
          placeholder="Profile Photo URL"
          className="input input-bordered w-full"
          value={form.photoUrl}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <select
            name="gender"
            className="select select-bordered w-1/2"
            value={form.gender}
            onChange={handleChange}
          >
            <option disabled value="">
              Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Transgender</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="input input-bordered w-1/2"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <select
          name="sexualOrientation"
          className="select select-bordered w-full"
          value={form.sexualOrientation}
          onChange={handleChange}
        >
          <option disabled value="">
            Sexual Orientation
          </option>
          <option>Straight</option>
          <option>Gay</option>
          <option>Lesbian</option>
          <option>Bisexual</option>
          <option>Pansexual</option>
          <option>Asexual</option>
          <option>Queer</option>
          <option>Questioning</option>
          <option>Other</option>
        </select>

        <textarea
          name="about"
          placeholder="About You"
          className="textarea textarea-bordered w-full"
          value={form.about}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          className="input input-bordered w-full"
          value={form.skills}
          onChange={handleChange}
        />

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
            "Save Changes"
          )}
        </button>

        <p className="text-center text-sm opacity-70 mt-2">
          You won’t be able to make changes for
          <span className="font-semibold"> 7 days </span>
          after this change.
        </p>
      </form>
    </div>
  );
}
