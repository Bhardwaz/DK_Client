import { useEffect } from "react";
import { selectUser } from "../components/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "./socket";
import {
  isOnline,
  pushMessage,
  updateMessage,
  updatePreviewMessage,
} from "../components/pages/chat/chatSlice";
import { ShowMessageToast } from "./Toasts";

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { _id: loggedInUserId } = useSelector(selectUser);

  useEffect(() => {
    if (!loggedInUserId) return;
    const socket = getSocket(loggedInUserId);

    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected", socket.id);
      socket.emit("register", loggedInUserId);
    });

    socket.on("connect:error", (err) => {
      console.error("Connection error:", err.message);
    });

    socket.on("chat:receive", (newMsg) => {
      dispatch(pushMessage(newMsg));
      dispatch(updatePreviewMessage(newMsg));
      ShowMessageToast(newMsg);

      socket.emit("chat:delivered", {
        tempId: newMsg.tempId,
        chat: newMsg.chat,
        messageId: newMsg._id,
        sender: newMsg.sender,
        receiver: newMsg.receiver,
        seeing: newMsg.seeing,
      });
    });

    socket.on(
      "chat:status",
      ({ tempId, chat, messageId, sender, receiver, status }) => {
        dispatch(
          updateMessage({
            tempId,
            chat,
            messageId,
            sender,
            receiver,
            status,
            type: "chat:status",
          })
        );
      }
    );

    socket.on("chat:stored", ({ tempId, status, messageId, chat }) => {
      dispatch(
        updateMessage({
          tempId,
          messageId,
          status,
          chat,
        })
      );
    });

    socket.on("pending:delivered", (messages) => {
      messages.forEach((m, i) => {
        dispatch(
          updateMessage({
            tempId: "notExist",
            chat: m.chat,
            messageId: m._id,
            sender: m.sender,
            receiver: m.receiver,
            status: "delivered",
          })
        );

        if (i === messages.length - 1) {
          dispatch(
            updatePreviewMessage({
              tempId: "notExist",
              chat: m.chat,
              messageId: m._id,
              sender: m.sender,
              receiver: m.receiver,
              status: "delivered",
              unreadCount: i,
            })
          );
        }
      });
    });

    socket.on("user:online", ({ sender, online }) => {
      dispatch(isOnline(sender, online));
    });

    return () => {
      socket.off("chat:receive");
      socket.off("chat:status");
      socket.disconnect();
      socket.off("connect");
      socket.off("connect_error");
      socket.off("chat:stored");
      socket.off("user:online");
    };
  }, [loggedInUserId, dispatch]);

  return children;
};

export default SocketProvider;
