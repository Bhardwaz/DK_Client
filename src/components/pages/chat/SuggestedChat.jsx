import { useSelector } from "react-redux";
import { selectConnectionsWithoutChat } from "./chatSlice";
import { Link } from "react-router-dom";

export default function SuggestedChat() {
  const connections = useSelector(selectConnectionsWithoutChat);
  if (!connections?.length) return null;

  return (
    <div style={{ padding: "20px 16px" }}>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "14px" }}>
        Start a conversation
      </p>
      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
        {connections.map((conn) => (
          <Link
            key={conn._id}
            to={`/chat/lazy/null/${conn._id}`}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0 }}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              padding: "2px",
              background: "linear-gradient(135deg, var(--pink), #8b5cf6)",
            }}>
              <img
                src={conn.mainPhoto}
                alt={conn.firstName}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2.5px solid var(--bg)" }}
              />
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-3)" }}>{conn.firstName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
