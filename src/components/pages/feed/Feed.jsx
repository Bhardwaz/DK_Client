import { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { fetchFeed, removeUser, selectAllProfiles, userInteraction } from "./feedSlice";

export default function Feed() {
  const dispatch = useDispatch()
  const { _id } = useSelector(selectUser)
  const allProfiles = useSelector(selectAllProfiles)
  
  useEffect(() => {
    dispatch(fetchFeed(_id))
  }, [_id, dispatch]);

  const handleAction = async (toUserId, action) => {    
    dispatch(userInteraction({ toUserId, action })) 
    dispatch(removeUser(allProfiles))
  };

  if (allProfiles?.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-lg text-primary text-center">
        No more profiles 🥲
      </div>
    </div>
  );
}
  
  return (
    allProfiles?.length > 0 &&
    <div className="flex items-center justify-center flex-col p-4">
      <UserCard
        key={allProfiles[0]._id}
        user={allProfiles[0]}
        onInterested={() => handleAction(allProfiles[0]._id, "interested")}
        onIgnore={() => handleAction(allProfiles[0]._id, "ignored")}
      />
    </div>
  );
}
