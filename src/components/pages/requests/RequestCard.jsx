import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import requestSlice from "./requestSlice";

const IconHeart = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

function RequestCard({ id, firstName, lastName, age, photoUrl, about, gender, skills }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);

  const handle = (action) => {
    setStatus(action);
    dispatch(requestSlice({ id, action }));
  };

  return (
    <li style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "16px",
      borderBottom: "1px solid var(--border)",
      opacity: status ? 0.5 : 1,
      transition: "opacity 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <Link to={`/profile/view/${id}`} style={{ flexShrink: 0 }}>
          <img
            src={photoUrl}
            alt={firstName}
            style={{ width: "58px", height: "58px", borderRadius: "18px", objectFit: "cover" }}
          />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>
            {firstName} {lastName}
            <span style={{ fontWeight: 400, color: "var(--text-3)", fontSize: "13px", marginLeft: "6px" }}>{age}</span>
          </div>
          {about && (
            <p style={{
              fontSize: "13px", color: "var(--text-2)", marginTop: "3px",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{about}</p>
          )}
          {skills?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "7px" }}>
              {skills.slice(0, 3).map((s, i) => <span key={i} className="chip">{s}</span>)}
            </div>
          )}
        </div>

        {status && (
          <span style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
            color: status === "accepted" ? "#4ade80" : "#f87171",
          }}>{status}</span>
        )}
      </div>

      {!status && (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => handle("accepted")}
            className="btn btn-primary"
            style={{ flex: 1, padding: "10px", fontSize: "13px", justifyContent: "center" }}
          >
            <IconHeart /> Accept
          </button>
          <button
            onClick={() => handle("rejected")}
            className="btn btn-ghost"
            style={{ flex: 1, padding: "10px", fontSize: "13px", justifyContent: "center" }}
          >
            <IconX /> Decline
          </button>
        </div>
      )}
    </li>
  );
}

export default RequestCard
