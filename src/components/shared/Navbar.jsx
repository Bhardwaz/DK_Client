import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectIsAuth, selectUser } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { selectAllRequests } from "../pages/requests/requestSlice";
import { selectChats } from "../pages/chat/chatSlice";

// Navbar.jsx
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsAuth);
  const allRequests = useSelector(selectAllRequests);
  const loggedInUserId = useSelector(selectUser);
  const chats = useSelector(selectChats);

  const unreadCount = chats.reduce((acc, cur) => {
    return cur?.unreadCount ? acc + 1 : acc
  }, 0);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/signin");
    dispatch({ type: "auth/logout" });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* === START === */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Mobile Dropdown */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/">Feed</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/chat">Chat</Link>
                </li>
                <li>
                  <Link to={`/profile/view/${loggedInUserId._id}`}>
                    Profile{" "}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          DateKarle
        </Link>
      </div>

      {/* === CENTER === */}
      {isLoggedIn && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Feed</Link>
            </li>

            <li>
              <Link
                to="/requests"
                className="indicator flex items-center space-x-1"
              >
                <span>Requests</span>
                {allRequests?.length > 0 ? (
                  <span className="indicator-item badge badge-xs badge-primary">
                    {allRequests?.length}
                  </span>
                ) : null}
              </Link>
            </li>

            <li>
              <Link
                to="/chat"
                className="indicator flex items-center space-x-1"
              >
                <span>Chat</span>
                {unreadCount ? (
                  <span className="indicator-item badge badge-xs badge-primary">
                    {unreadCount}
                  </span>
                ) : null}
              </Link>
            </li>

            <li>
              <Link to={`/profile/view/${loggedInUserId._id}`}>Profile</Link>
            </li>
          </ul>
        </div>
      )}

      <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-sm" title="Toggle Theme">
          🌓
        </button>

        <button className="btn btn-ghost btn-sm" title="Notifications">
          🔔
        </button>

        {/* Help */}
        <Link to="/help" className="btn btn-ghost btn-sm px-3 py-1.5">
          Help
        </Link>

        {/* Logout */}
        {isLoggedIn && (
          <button onClick={logout} className="btn btn-sm btn-outline">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
