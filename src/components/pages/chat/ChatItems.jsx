import { Link } from "react-router-dom";

export default function ChatItems({ chat, chatId, status, name, url, targetUserId, lastMessage }) {
  const unread = chat?.unreadCount > 0;

  return (
    <li style={{ listStyle: "none" }}>
      <Link
        to={`/chat/${status}/${chatId}/${targetUserId}`}
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", transition: "background 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={url}
            alt={name}
            style={{ width: "52px", height: "52px", borderRadius: "18px", objectFit: "cover" }}
          />
          {chat?.otherUser?.isOnline && <span className="online-dot" />}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: unread ? 700 : 500, fontSize: "15px", color: "var(--text)" }}>{name}</span>
            {lastMessage?.createdAt && (
              <span style={{ fontSize: "11px", color: "var(--text-3)" }}>
                {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "3px" }}>
            <p style={{
              fontSize: "13px",
              color: unread ? "var(--text-2)" : "var(--text-3)",
              fontWeight: unread ? 500 : 400,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              maxWidth: "240px",
            }}>
              {lastMessage?.content || "Start a conversation"}
            </p>
            {chat?.unreadCount > 0 && (
              <span style={{
                minWidth: "20px", height: "20px", borderRadius: "10px",
                background: "var(--pink)", color: "#fff",
                fontSize: "10px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 5px", marginLeft: "8px", flexShrink: 0,
              }}>{chat.unreadCount}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
