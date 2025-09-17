import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  selectChats,
} from "./chatSlice";
import ChatItems from "./ChatItems";
import SuggestedChat from "./SuggestedChat";

const ChatsData = () => {
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
 
  useEffect(() => {
     if(chats.length === 0) dispatch(fetchChats());
  }, [dispatch, chats.length]);
  
  if (!chats || chats.length === 0) {
    return (
      <>
        <ul className="text-center py-6">
          <li className="text-gray-500">
            <p className="font-medium">💬 No chats yet</p>
            <p className="text-sm text-gray-400">Start a conversation</p>
          </li>
        </ul>

        <SuggestedChat />
      </>
    );
  }
  
  return (
    <ul className="w-full sm:max-w-2xl sm:mx-auto bg-base-200 divide-y divide-base-300">
      {chats.length > 0
        ? chats?.map(chat => {
            return (
              <ChatItems
                key={chat?._id}
                chat={chat}
                chatId={chat?._id}
                type={null}
                status="active"
                name={chat?.otherUser?.firstName}
                url={chat?.otherUser?.mainPhoto}
                targetUserId={chat?.otherUser?._id}
                lastMessage={chat.lastMessage}
              />
            );
          })
        : null}

      <SuggestedChat />
    </ul>
  );
};

export default ChatsData;
