import { useMemo } from "react";

export const getRelativeTime = (date) => {
  if (!date) return "";
  const now = Date.now();
  const past = new Date(date).getTime();
  const diffMs = now - past;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMinutes > 0)
    return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  return "just now";
};

// chat compo utilities fn

// 1. storing user with we are chatting in localstorage
export function useLocalStorage(status, chats, connectionWithOutChat, targetUserId) {
  return useMemo(() => {
    let user;
    if (status === "active") {
      user = chats?.find(
        (chat) => chat?.otherUser._id === targetUserId
      )?.otherUser;
    } else {
      user = connectionWithOutChat?.find(
        (conn) => conn?.user?._id === targetUserId
      )?.user;
    }
    if (user) {
      localStorage.setItem("targetUserInfo", JSON.stringify(user));
    }
    return user;
  }, [chats, targetUserId, connectionWithOutChat, status]);
}
