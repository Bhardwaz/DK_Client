import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MoreVertical, ArrowLeft, Send, ArrowDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { getRelativeTime, useLocalStorage } from "../../../utils/utilityfn";
import {
  fetchMessages,
  pushMessage,
  selectAllMessages,
  selectChats,
  selectConnectionsWithoutChat,
  selectOnline,
  updatePreviewMessage,
  updateUnreadCount,
} from "./chatSlice";
import { read, sendMessage, unread } from "../../../utils/socket";

const Chat = () => {
  const { status, chatId, targetUserId } = useParams();
  const { _id, firstName, lastName, mainPhoto } = useSelector(selectUser);
  const navigate = useNavigate();
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector(selectAllMessages);
  const chats = useSelector(selectChats);
  const connectionWithOutChat = useSelector(selectConnectionsWithoutChat);
  const isOnline = useSelector(selectOnline);
  const [loadMessages, setLoadMessages] = useState({
    batch: 1,
    limit: 20,
  });
  const [showScrollButton, setShowScrollButton] = useState(false);

  useLocalStorage(status, chats, connectionWithOutChat, targetUserId)
  const storedUser = useMemo(
    () => JSON.parse(localStorage.getItem("targetUserInfo") || "null"),
    []
  );
  useEffect(() => {
    if (status !== "lazy") {
      dispatch(
        fetchMessages({
          chatId,
          batch: loadMessages.batch,
          limit: loadMessages.limit,
        })
      );
    }
  }, [dispatch, chatId, status]);

  useEffect(() => {
    if (endOfMessagesRef.current && messages?.byId?.[chatId]?.batchNum === 1) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatId]);

  useEffect(() => {
    read(chatId, _id);
    dispatch(updateUnreadCount(chatId));

    return () => {
      unread(chatId, _id);
    };
  }, [chatId, _id, dispatch]);

  const handleSend = () => {
    if (!input.trim()) return;

    const tempId = Date.now().toString();

    const message = {
      tempId,
      photoUrl: mainPhoto,
      firstName,
      lastName,
      from: "me",
      content: input,
      createdAt: new Date().toISOString(),
      targetUserId,
      sender: _id,
      status: "pending",
      chat: chatId,
    };

    dispatch(pushMessage(message));
    dispatch(updatePreviewMessage(message));
    setInput("");
    sendMessage(message);
  };

  const loadNextBatch = () => {
    setLoadMessages((prev) => {
      const nextBatch = prev.batch + 1;
      dispatch(fetchMessages({ chatId, batch: nextBatch, limit: prev.limit }));
      return { ...prev, batch: nextBatch };
    });
    setShowScrollButton(true)
  };

  return (
    <div
      className="flex flex-col h-screen bg-base-100 overflow-y: auto"    >
      <div className="bg-base-200 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between p-3 max-w-2xl mx-auto w-full">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src={storedUser?.mainPhoto} alt="User Avatar" />
              </div>
            </div>
            <span className="font-semibold">
              {storedUser?.firstName + " " + storedUser?.lastName}
            </span>
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <MoreVertical className="w-5 h-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-200 rounded-box shadow-md mt-3 w-48"
            >
              <li>
                <Link to={`/profile/view/${targetUserId}`}>View Profile</Link>
              </li>
              <li>
                <button>Mute Notifications</button>
              </li>
              <li>
                <button>Clear Chat</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {!messages?.byId?.[chatId]?.messages ? (
        <div className="flex h-full mt-32 w-full items-center justify-center">
          <p className="text-black text-lg font-semibold">
            💌 No chat yet, start a new one!
          </p>
        </div>
      ) : null}

      <div className="flex-1 px-3 py-2 max-w-2xl w-full mx-auto">
        {messages?.byId?.[chatId]?.messages?.length > 0 &&
          messages?.byId?.[chatId]?.hasMore && (
            <div className="flex justify-center mb-2">
              <button onClick={loadNextBatch} className="btn btn-sm px-3 py-5">
                Load More Messages
              </button>
            </div>
          )}
        {messages?.byId?.[chatId]?.messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${
              msg.sender === _id ? "chat-end" : "chat-start"
            } mb-1`}
          >
            <div className="chat-image avatar">
              <div className="w-8 rounded-full">
                <img src={msg?.photoUrl} alt={msg.from} />
              </div>
            </div>
            <div className="chat-header">
              {msg.firstName}
              <time className="text-xs opacity-50 ml-1">
                {getRelativeTime(msg.createdAt)}
              </time>
            </div>
            <div className="chat-bubble max-w-[70%]">{msg.content}</div>
            {msg.status && (
              <div className="chat-footer opacity-50">{msg.status}</div>
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef}></div>
      </div>

      {messages?.byId?.[chatId]?.batchNum > 1 && showScrollButton && (
        <button
          onClick={() => {
            endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
            setShowScrollButton(false)
          }}
          className="btn btn-circle btn-primary fixed bottom-20 right-5 shadow-lg left-1/2"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}

      <div className="border-base-300 sticky bottom-0 z-10">
        <div className="p-2 flex items-center gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Type a message"
            className="input input-bordered flex-1 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="btn btn-primary btn-circle">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
