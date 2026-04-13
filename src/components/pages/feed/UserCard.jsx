import { useState } from "react";
import { Link } from "react-router-dom";

const IconX = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function UserCard({ user, onInterested, onIgnore, swipeDir }) {
  const photos = user?.photoUrl ? [user.photoUrl, ...(user.photos || []).filter(p => p !== user.photoUrl)] : [];
  const allPhotos = photos.length ? photos : [user?.photoUrl];
  const [photoIdx, setPhotoIdx] = useState(0);

  return (
    <div style={{
      width: "100%",
      maxWidth: "420px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      {/* Match indicator */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{
          display: "flex", alignItems: "center", gap: "5px",
          fontSize: "12px", color: "var(--pink)", fontWeight: 600,
        }}>
          <IconStar /> {user?.matchScore || Math.floor(Math.random() * 20 + 78)}% match
        </span>
      </div>

      {/* Photo card */}
      <div
        className={swipeDir === "right" ? "swipe-right" : swipeDir === "left" ? "swipe-left" : ""}
        style={{
          position: "relative",
          borderRadius: "28px",
          overflow: "hidden",
          aspectRatio: "3/4",
          maxHeight: "calc(100dvh - 320px)",
          background: "var(--bg-2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <img
          src={allPhotos[photoIdx]}
          alt={user?.firstName}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />

        {/* Swipe overlays */}
        {swipeDir === "right" && (
          <div style={{
            position: "absolute", top: "20px", left: "20px", zIndex: 20,
            padding: "8px 18px", borderRadius: "100px",
            border: "2.5px solid #4ade80", color: "#4ade80",
            fontWeight: 800, fontSize: "18px", letterSpacing: "0.1em",
            transform: "rotate(-15deg)",
          }}>LIKE</div>
        )}
        {swipeDir === "left" && (
          <div style={{
            position: "absolute", top: "20px", right: "20px", zIndex: 20,
            padding: "8px 18px", borderRadius: "100px",
            border: "2.5px solid #f87171", color: "#f87171",
            fontWeight: 800, fontSize: "18px", letterSpacing: "0.1em",
            transform: "rotate(15deg)",
          }}>NOPE</div>
        )}

        {/* Photo dots */}
        {allPhotos.length > 1 && (
          <div style={{
            position: "absolute", top: "14px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "5px", zIndex: 10,
          }}>
            {allPhotos.map((_, i) => (
              <div key={i} onClick={() => setPhotoIdx(i)} style={{
                width: i === photoIdx ? "20px" : "6px", height: "6px",
                borderRadius: "3px",
                background: i === photoIdx ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: "pointer", transition: "all 0.2s",
              }} />
            ))}
          </div>
        )}

        {/* Tap zones */}
        <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 5 }}>
          <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setPhotoIdx(i => Math.max(0, i - 1))} />
          <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setPhotoIdx(i => Math.min(allPhotos.length - 1, i + 1))} />
        </div>

        {/* Gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
          zIndex: 6,
        }} />

        {/* Info overlay */}
        <Link to={`/profile/view/${user?._id}`} style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "20px", zIndex: 7, textDecoration: "none", color: "var(--text)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 500 }}>{user?.firstName}</span>
                <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>{user?.age}</span>
              </div>
              {user?.location && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "3px" }}>
                  <IconPin /> {user.location}
                </div>
              )}
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "8px", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {user?.about}
          </p>
          {user?.skills?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
              {user.skills.slice(0, 4).map((s, i) => <span key={i} className="chip">{s}</span>)}
            </div>
          )}
        </Link>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <ActionBtn
          onClick={onIgnore}
          size={52}
          icon={<IconX />}
          hoverBg="rgba(248,113,113,0.15)"
        />
        <ActionBtn
          onClick={onInterested}
          size={68}
          icon={<IconHeart />}
          primary
        />
        <ActionBtn
          size={52}
          icon={<IconStar />}
          iconColor="rgba(255,200,0,0.8)"
          hoverBg="rgba(255,200,0,0.12)"
        />
      </div>
    </div>
  );
}

function ActionBtn({ onClick, size, icon, primary, iconColor, hoverBg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${size}px`, height: `${size}px`,
        borderRadius: "50%", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        background: primary
          ? "linear-gradient(135deg, var(--pink), var(--pink-dark))"
          : hovered ? (hoverBg || "var(--surface-hover)") : "var(--surface)",
        color: primary ? "#fff" : (iconColor || "var(--text-2)"),
        boxShadow: primary && hovered ? "0 8px 24px var(--pink-glow)" : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        border: primary ? "none" : "1px solid var(--border)",
      }}
    >
      {icon}
    </button>
  );
}
