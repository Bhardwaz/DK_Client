import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { fetchFeed, removeUser, selectAllProfiles, userInteraction } from "./feedSlice";

export default function Feed() {
  const dispatch = useDispatch();
  const { _id } = useSelector(selectUser);
  const allProfiles = useSelector(selectAllProfiles);
  const [swipeDir, setSwipeDir] = useState(null);

  useEffect(() => {
    dispatch(fetchFeed(_id));
  }, [_id, dispatch]);

  const handleAction = (toUserId, action) => {
    const dir = action === "interested" ? "right" : "left";
    setSwipeDir(dir);
    setTimeout(() => {
      dispatch(userInteraction({ toUserId, action }));
      dispatch(removeUser(allProfiles));
      setSwipeDir(null);
    }, 340);
  };

  if (allProfiles?.length === 0) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        height: "100%", gap: "14px", padding: "60px 24px",
      }} className="fade-up">
        <span style={{ fontSize: "52px" }}>🌸</span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 500 }}>You're all caught up</h2>
        <p style={{ fontSize: "14px", color: "var(--text-3)", textAlign: "center", maxWidth: "240px", lineHeight: 1.6 }}>
          Check back soon for new profiles near you.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "16px 16px 8px",
      minHeight: "100%",
    }}>
      <UserCard
        key={allProfiles[0]._id}
        user={allProfiles[0]}
        swipeDir={swipeDir}
        onInterested={() => handleAction(allProfiles[0]._id, "interested")}
        onIgnore={() => handleAction(allProfiles[0]._id, "ignored")}
      />
    </div>
  );
}
