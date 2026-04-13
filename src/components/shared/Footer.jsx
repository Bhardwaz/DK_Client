import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectIsAuth, selectUser } from "../auth/authSlice";
import { selectAllRequests } from "../pages/requests/requestSlice";
import { selectChats } from "../pages/chat/chatSlice";

const icons = {
  home: (active) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  heart: (active) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  chat: (active) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  person: (active) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

export default function Footer() {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const requests = useSelector(selectAllRequests);
  const chats = useSelector(selectChats);
  const unread = chats.reduce((a, c) => c?.unreadCount ? a + 1 : a, 0);

  if (!isLoggedIn) return null;

  const tabs = [
    { to: "/",           icon: "home",   label: "Discover" },
    { to: "/requests",   icon: "heart",  label: "Requests", badge: requests?.length },
    { to: "/chat",       icon: "chat",   label: "Messages", badge: unread },
    { to: `/profile/view/${user?._id}`, icon: "person", label: "Profile" },
  ];

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "6px 8px",
      borderTop: "1px solid var(--border)",
      background: "rgba(10,10,10,0.97)",
      backdropFilter: "blur(20px)",
      position: "sticky",
      bottom: 0,
      zIndex: 50,
    }}>
      {tabs.map(({ to, icon, label, badge }) => {
        const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
        return (
          <Link key={to} to={to} className={`nav-tab ${active ? "active" : ""}`} style={{ textDecoration: "none" }}>
            <div style={{ position: "relative" }}>
              {icons[icon](active)}
              {badge > 0 && <span className="badge">{badge}</span>}
            </div>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
