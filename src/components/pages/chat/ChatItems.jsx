import { Link } from "react-router-dom";
import { getRelativeTime } from "../../../utils/utilityfn";
import { FaComments } from "react-icons/fa";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";

const ChatItems = ({ chat, chatId, type, status, name, url, targetUserId, lastMessage }) => {
  const { _id: loggedInUserId } = useSelector(selectUser);
  return (
    <Link
      key={chat._id}
      to={`/chat/${status}/${chatId}/${targetUserId}`}
      className="flex items-center p-3 sm:p-4 gap-3 sm:gap-4 hover:bg-base-300/80 relative group"
    >
      {/*  Left highlight bar */}
      <span className="absolute left-0 top-0 h-full w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-200 rounded-r"></span>

      {/* Avatar */}
      <div className="avatar flex-shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
          {type === "connectionsWithoutChat" ? (
            <img
              src={url || "/default-avatar.png"}
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={url || "/default-avatar.png"}
              alt={name}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Chat info */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base sm:text-lg truncate">
            {type === "connectionsWithoutChat"
              ? name + " " + chat?.user?.lastName || "Unknown User"
              : name + " " + chat?.otherUser?.lastName || "Unknown User"}
          </h3>
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
            {type === "connectionsWithoutChat"
              ? `Friend since ${getRelativeTime(chat.createdAt)}`
              : chat?.lastMessage?.createdAt
              ? getRelativeTime(chat.lastMessage.createdAt)
              : ""}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-0.5 sm:mt-1 flex items-center gap-1">
          {type === "connectionsWithoutChat" ? (
            chat?.user?.about
          ) : (
            <>
              {lastMessage?.sender === loggedInUserId && (
                <>
                  {lastMessage?.status === "sent" && (
                    <FaCheck className="text-gray-400 text-xs" />
                  )}
                  {lastMessage?.status === "delivered" && (
                    <FaCheckDouble className="text-gray-400 text-xs" />
                  )}
                  {lastMessage?.status === "read" && (
                    <FaCheckDouble className="text-blue-500 text-xs" />
                  )}
                </>
              )}
              {/* Show the last message text */}
              {chat?.lastMessage?.content || "No messages yet"}
            </>
          )}
        </p>
      </div>

      {/* Unread badge */}

      {type === "connectionsWithoutChat" ? (
        <div className="badge badge-primary badge-sm sm:badge-md flex-shrink-0 ml-2">
          <FaComments className="text-lg" />
        </div>
      ) : chat.unreadCount > 0 ? (
        <div className="badge badge-primary badge-sm sm:badge-md flex-shrink-0 ml-2">
          {chat.unreadCount}
        </div>
      ) : null}
    </Link>
  );
};

export default ChatItems;
