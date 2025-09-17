import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConnectionsWithoutChat,
  selectConnectionsWithoutChat,
  selectConnectionsWithoutChatApi,
} from "./chatSlice";
import ChatItems from "./ChatItems";

const SuggestedChat = () => {
  const dispatch = useDispatch();
  const connectionsWithoutChat = useSelector(selectConnectionsWithoutChat);
  const flag = useSelector(selectConnectionsWithoutChatApi)
  
  useEffect(() => {
   if(!flag){
    dispatch(fetchConnectionsWithoutChat());
   }
  }, [dispatch, flag]);

  return (
    <div className="my-6">
      {/* Heading */}
      {connectionsWithoutChat?.length > 0 ? (
        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-t border-gray-300 sm:max-w-xs" />
          <span className="px-3 text-gray-600 text-base sm:text-lg font-medium whitespace-nowrap">
            💬 People you may like to chat
          </span>
          <hr className="flex-grow border-t border-gray-300 sm:max-w-xs" />
        </div>
      ) : null}

      {/* List */}
      <div className="w-full sm:max-w-2xl sm:mx-auto bg-base-200 divide-y divide-base-300">
        {connectionsWithoutChat?.length > 0 ? (
          connectionsWithoutChat.map((conn) => {
            return (
              <ChatItems
                key={conn.user._id}
                chat={conn}
                chatId="not_exists"
                type="connectionsWithoutChat"
                status="lazy"
                name={conn?.user?.firstName}
                url={conn?.user?.photoUrl}
                targetUserId={conn?.user?._id}
              />
            );
          })
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default SuggestedChat;
