import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProfile, selectProfile, selectViewId, setViewId } from "./profileSlice";
import { selectUser } from "../../auth/authSlice";

const IconEdit = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function ProfileView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const profile = useSelector(selectProfile);
  const viewId = useSelector(selectViewId);
  const user = useSelector(selectUser);
  const isOwnProfile = user?._id === id;

  useEffect(() => {
    if (viewId === id) return;
    dispatch(fetchProfile(id));
    dispatch(setViewId(id));
  }, [dispatch, id, viewId]);

  const displayPhoto = isOwnProfile ? user?.mainPhoto : profile?.mainPhoto;
  const displayUser = isOwnProfile ? { ...user, ...profile } : profile;

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", paddingBottom: "32px" }} className="fade-up">
      {/* Hero */}
      <div style={{ position: "relative", height: "280px" }}>
        <img
          src={displayPhoto}
          alt={displayUser?.firstName}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, var(--bg) 100%)",
        }} />
      </div>

      {/* Profile card */}
      <div style={{ padding: "0 20px", marginTop: "-32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "12px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 500, lineHeight: 1.1 }}>
              {displayUser?.firstName}{" "}
              <span style={{ fontWeight: 300 }}>{displayUser?.lastName}</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginTop: "5px", fontSize: "13px", color: "var(--text-3)" }}>
              {displayUser?.age && <span>{displayUser.age} yrs</span>}
              {displayUser?.gender && <><span>·</span><span>{displayUser.gender}</span></>}
              {displayUser?.location && (
                <><span>·</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <IconPin />{displayUser.location}
                  </span>
                </>
              )}
            </div>
          </div>
          {isOwnProfile && (
            <Link
              to={`/profile/edit/${id}`}
              className="btn btn-ghost"
              style={{ display: "flex", gap: "6px", padding: "9px 16px", fontSize: "12px", textDecoration: "none" }}
            >
              <IconEdit /> Edit
            </Link>
          )}
        </div>

        {/* About */}
        {displayUser?.about && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.7 }}>{displayUser.about}</p>
          </div>
        )}

        {/* Skills */}
        {displayUser?.skills?.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "10px" }}>Interests</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {displayUser.skills.map((s, i) => <span key={i} className="chip chip-pink">{s}</span>)}
            </div>
          </div>
        )}

        {/* Details */}
        {displayUser?.interestIn?.length > 0 && (
          <div className="card" style={{ padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "10px" }}>Looking for</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {displayUser.interestIn.map((item, i) => <span key={i} className="chip">{item}</span>)}
            </div>
          </div>
        )}

        {/* Stats (own profile only) */}
        {isOwnProfile && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              { label: "Likes sent", value: "24" },
              { label: "Connections", value: "8" },
              { label: "Views", value: "142" },
            ].map(stat => (
              <div key={stat.label} className="card" style={{ padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 500 }}>{stat.value}</div>
                <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "3px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
