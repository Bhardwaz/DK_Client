import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MoreVertical, ArrowLeft, Send, ArrowDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { getRelativeTime, useLocalStorage } from "../../../utils/utilityfn";
import {
  fetchMessages, pushMessage, selectAllMessages, selectChats,
  selectConnectionsWithoutChat, selectOnline, updatePreviewMessage, updateUnreadCount,
} from "./chatSlice";
import { read, sendMessage, unread } from "../../../utils/socket";

export default function Chat() {
  const { status, chatId, targetUserId } = useParams();
  const { _id, firstName, lastName, mainPhoto } = useSelector(selectUser);
  const navigate = useNavigate();
  const endRef = useRef(null);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector(selectAllMessages);
  const chats = useSelector(selectChats);
  const connectionWithOutChat = useSelector(selectConnectionsWithoutChat);
  const isOnline = useSelector(selectOnline);
  const [loadMessages, setLoadMessages] = useState({ batch: 1, limit: 20 });
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useLocalStorage(status, chats, connectionWithOutChat, targetUserId);
  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("targetUserInfo") || "null"), []);

  useEffect(() => {
    if (status !== "lazy") dispatch(fetchMessages({ chatId, batch: loadMessages.batch, limit: loadMessages.limit }));
  }, [dispatch, chatId, status]);

  useEffect(() => {
    if (endRef.current && messages?.byId?.[chatId]?.batchNum === 1) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatId]);

  useEffect(() => {
    read(chatId, _id);
    dispatch(updateUnreadCount(chatId));
    return () => unread(chatId, _id);
  }, [chatId, _id, dispatch]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = {
      tempId: Date.now().toString(),
      photoUrl: mainPhoto, firstName, lastName,
      from: "me", content: input,
      createdAt: new Date().toISOString(),
      targetUserId, sender: _id, status: "pending", chat: chatId,
    };
    dispatch(pushMessage(msg));
    dispatch(updatePreviewMessage(msg));
    setInput("");
    sendMessage(msg);
  };

  const loadMore = () => {
    setLoadMessages(prev => {
      const next = prev.batch + 1;
      dispatch(fetchMessages({ chatId, batch: next, limit: prev.limit }));
      return { ...prev, batch: next };
    });
    setShowScrollBtn(true);
  };

  const chatMsgs = messages?.byId?.[chatId]?.messages || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg)" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-icon"
          style={{ flexShrink: 0 }}
        >
          <ArrowLeft size={18} />
        </button>

        <Link to={`/profile/view/${targetUserId}`} style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, textDecoration: "none", color: "var(--text)" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img src={storedUser?.mainPhoto} alt="avatar" style={{ width: "38px", height: "38px", borderRadius: "12px", objectFit: "cover" }} />
            {isOnline && <span className="online-dot" />}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>
              {storedUser?.firstName} {storedUser?.lastName}
            </div>
            <div style={{ fontSize: "11px", color: isOnline ? "var(--green)" : "var(--text-3)" }}>
              {isOnline ? "Active now" : "Offline"}
            </div>
          </div>
        </Link>

        {/* More menu */}
        <div style={{ position: "relative" }}>
          <button className="btn btn-icon"><MoreVertical size={17} /></button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {chatMsgs.length > 0 && messages?.byId?.[chatId]?.hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <button onClick={loadMore} className="btn btn-ghost" style={{ padding: "7px 18px", fontSize: "12px" }}>
              Load earlier messages
            </button>
          </div>
        )}

        {chatMsgs.length === 0 && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", fontSize: "14px" }}>
            💌 Send the first message!
          </div>
        )}

        {chatMsgs.map((msg, idx) => {
          const isMe = msg.sender === _id;
          return (
            <div key={idx} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
              {!isMe && (
                <img src={msg?.photoUrl} alt={msg.firstName} style={{ width: "28px", height: "28px", borderRadius: "8px", objectFit: "cover", marginRight: "8px", alignSelf: "flex-end" }} />
              )}
              <div style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: isMe ? "linear-gradient(135deg, var(--pink), var(--pink-dark))" : "var(--surface)",
                border: isMe ? "none" : "1px solid var(--border)",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "var(--text)",
              }}>
                {msg.content}
                <div style={{ fontSize: "10px", opacity: 0.5, marginTop: "4px", textAlign: isMe ? "right" : "left" }}>
                  {getRelativeTime(msg.createdAt)}
                  {isMe && msg.status === "pending" && " · sending"}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Scroll to bottom btn */}
      {messages?.byId?.[chatId]?.batchNum > 1 && showScrollBtn && (
        <button
          onClick={() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); setShowScrollBtn(false); }}
          className="btn btn-primary"
          style={{
            position: "fixed", bottom: "80px", left: "50%", transform: "translateX(-50%)",
            width: "40px", height: "40px", borderRadius: "50%", padding: 0, boxShadow: "0 4px 20px var(--pink-glow)",
          }}
        >
          <ArrowDown size={16} />
        </button>
      )}

      {/* Input */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 14px",
        borderTop: "1px solid var(--border)",
        background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(20px)",
      }}>
        <input
          className="input"
          type="text"
          placeholder="Message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          style={{ flex: 1, borderRadius: "100px", padding: "10px 18px", margin: 0 }}
        />
        <button
          onClick={handleSend}
          className="btn btn-primary"
          style={{ width: "42px", height: "42px", borderRadius: "50%", padding: 0, flexShrink: 0 }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
