import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, selectChats } from "./chatSlice";
import ChatItems from "./ChatItems";
import SuggestedChat from "./SuggestedChat";

export default function ChatsData() {
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);

  useEffect(() => {
    if (chats.length === 0) dispatch(fetchChats());
  }, [dispatch, chats.length]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }} className="fade-up">
      {/* Header */}
      <div style={{ padding: "20px 16px 8px", borderBottom: "1px solid var(--border)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 500 }}>Messages</h1>
      </div>

      {chats.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-3)" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>💬</div>
          <p style={{ fontSize: "14px", fontWeight: 500 }}>No conversations yet</p>
          <p style={{ fontSize: "13px", marginTop: "4px" }}>Connect with someone to start chatting</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {chats.map(chat => (
            <ChatItems
              key={chat?._id}
              chat={chat}
              chatId={chat?._id}
              status="active"
              name={chat?.otherUser?.firstName}
              url={chat?.otherUser?.mainPhoto}
              targetUserId={chat?.otherUser?._id}
              lastMessage={chat.lastMessage}
            />
          ))}
        </ul>
      )}

      <SuggestedChat />
    </div>
  );
}
