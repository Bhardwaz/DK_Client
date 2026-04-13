import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile, fetchUploadUrl, deletePhoto, selectPhotos,
  addPhoto, fetchProfile, setMain,
} from "./profileSlice";
import axios from "axios";
import { selectUser } from "../../auth/authSlice";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const getModified = (original, updated) => {
  const modified = {};
  for (const key in updated) {
    const newVal = updated[key], oldVal = original[key];
    if (Array.isArray(newVal) && Array.isArray(oldVal)) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && newVal.length !== 0) modified[key] = newVal;
      continue;
    }
    if (!Array.isArray(newVal) && !Array.isArray(oldVal) && oldVal !== newVal && newVal !== "") modified[key] = newVal;
  }
  return modified;
};

const Row = ({ children, cols = 1 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "10px" }}>
    {children}
  </div>
);

export default function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { id } = useParams();
  const user = useSelector(selectUser);

  const [form, setForm] = useState({
    firstName: "", lastName: "", emailId: "",
    gender: "", age: "", about: "", skills: "", sexualOrientation: "",
  });
  const [mainPhoto, setMainPhoto] = useState(user?.mainPhoto);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (photos.length === 0) dispatch(fetchProfile(id));
  }, [dispatch, id]);

  const uploadToS3 = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { uploadUrl, fileUrl } = await fetchUploadUrl(file.type);
      await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } });
      dispatch(addPhoto(fileUrl));
    } catch (err) { console.error("Upload failed", err); }
  };

  const setAsMain = async (photo) => {
    setMainPhoto(photo);
    dispatch(setMain(photo));
    await toast.promise(
      axiosInstance.post("/set-main", { data: { fileUrl: photo } }),
      { loading: "Setting profile picture…", success: "Profile picture updated", error: "Failed to update" }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const modified = getModified(user, form);
    if (Object.keys(modified).length === 0) return;
    dispatch(editProfile(modified));
    navigate(`/profile/view/${user._id}`);
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "24px 16px 40px" }} className="fade-up">
      {/* Back + title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <Link to={`/profile/view/${user._id}`} className="btn btn-icon" style={{ textDecoration: "none" }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 500 }}>Edit Profile</h1>
      </div>

      {/* Main photo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
        <div style={{ position: "relative", width: "140px", height: "140px" }}>
          <img
            src={mainPhoto}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px" }}
          />
          <label style={{
            position: "absolute", bottom: "10px", right: "10px",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "var(--pink)", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}>
            <Camera size={16} color="#fff" />
            <input type="file" accept="image/*" onChange={uploadToS3} style={{ display: "none" }} />
          </label>
        </div>
      </div>

      {/* Photo strip */}
      {photos?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "10px" }}>Photos</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {photos.map((photo, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  src={photo}
                  alt=""
                  style={{ width: "72px", height: "72px", borderRadius: "14px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setAsMain(photo)}
                />
                <button
                  type="button"
                  onClick={() => dispatch(deletePhoto(photo))}
                  style={{
                    position: "absolute", top: "-6px", right: "-6px",
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: "#f87171", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={11} color="#fff" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Row cols={2}>
          <input className="input" placeholder="First name" name="firstName" value={form.firstName} onChange={set("firstName")} />
          <input className="input" placeholder="Last name" name="lastName" value={form.lastName} onChange={set("lastName")} />
        </Row>

        <input className="input" type="email" placeholder="Email address" name="emailId" value={form.emailId} onChange={set("emailId")} />

        <Row cols={2}>
          <select className="input" name="gender" value={form.gender} onChange={set("gender")}>
            <option value="" disabled>Gender</option>
            <option>Male</option><option>Female</option>
            <option>Non-binary</option><option>Transgender</option><option>Other</option>
          </select>
          <input className="input" type="number" placeholder="Age" name="age" value={form.age} onChange={set("age")} />
        </Row>

        <select className="input" name="sexualOrientation" value={form.sexualOrientation} onChange={set("sexualOrientation")}>
          <option value="" disabled>Sexual orientation</option>
          <option>Straight</option><option>Gay</option><option>Lesbian</option>
          <option>Bisexual</option><option>Pansexual</option><option>Asexual</option>
          <option>Queer</option><option>Questioning</option><option>Other</option>
        </select>

        <textarea className="input" rows={4} placeholder="About you…" name="about" value={form.about} onChange={set("about")} />

        <input className="input" placeholder="Interests (comma separated)" name="skills" value={form.skills} onChange={set("skills")} />

        <button type="submit" className="btn btn-primary" style={{ marginTop: "8px", padding: "14px", fontSize: "15px", width: "100%", justifyContent: "center" }}>
          Save Changes
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-3)", lineHeight: 1.5 }}>
          Profile changes may take up to <strong style={{ color: "var(--text-2)" }}>7 days</strong> to be reflected everywhere.
        </p>
      </form>
    </div>
  );
}
