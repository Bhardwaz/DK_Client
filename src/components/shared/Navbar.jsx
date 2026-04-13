import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectIsAuth, selectUser } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { selectAllRequests } from "../pages/requests/requestSlice";
import { selectChats } from "../pages/chat/chatSlice";

const IconHome = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);
const IconPerson = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsAuth);
  const allRequests = useSelector(selectAllRequests);
  const loggedInUser = useSelector(selectUser);
  const chats = useSelector(selectChats);

  const unreadCount = chats.reduce((acc, cur) => cur?.unreadCount ? acc + 1 : acc, 0);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/signin");
    dispatch({ type: "auth/logout" });
  };

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px",
      borderBottom: "1px solid var(--border)",
      background: "rgba(10,10,10,0.95)",
      backdropFilter: "blur(20px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Wordmark */}
      <Link to="/" style={{
        fontFamily: "var(--font-serif)",
        fontSize: "22px",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: "var(--text)",
        textDecoration: "none",
      }}>
        date<span style={{ color: "var(--pink)" }}>karle</span>
      </Link>

      {/* Center nav — desktop */}
      {isLoggedIn && (
        <nav style={{ display: "flex", gap: "4px" }}>
          {[
            { to: "/", icon: <IconHome />, label: "Discover" },
            { to: "/requests", icon: <IconHeart />, label: "Requests", badge: allRequests?.length },
            { to: "/chat", icon: <IconChat />, label: "Messages", badge: unreadCount },
            { to: `/profile/view/${loggedInUser?._id}`, icon: <IconPerson />, label: "Profile" },
          ].map(({ to, icon, label, badge }) => (
            <Link key={to} to={to} style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px", borderRadius: "10px",
              color: "var(--text-3)", fontSize: "13px", fontWeight: 500,
              textDecoration: "none", transition: "all 0.15s", position: "relative",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-3)"; }}
            >
              {icon}
              <span className="hidden lg:inline">{label}</span>
              {badge > 0 && (
                <span style={{
                  background: "var(--pink)", color: "#fff",
                  fontSize: "9px", fontWeight: 700,
                  padding: "1px 5px", borderRadius: "8px",
                  lineHeight: "14px",
                }}>{badge}</span>
              )}
            </Link>
          ))}
        </nav>
      )}

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Link to="/help" style={{
          padding: "7px 14px", borderRadius: "100px",
          background: "var(--surface)", border: "1px solid var(--border)",
          color: "var(--text-3)", fontSize: "12px", fontWeight: 500,
          textDecoration: "none", transition: "all 0.15s",
        }}>Help</Link>

        {isLoggedIn && (
          <button onClick={logout} className="btn btn-ghost" style={{ padding: "7px 16px", fontSize: "12px" }}>
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}
