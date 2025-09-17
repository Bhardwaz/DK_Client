import { useEffect } from "react";
import RequestCard from "./RequestCard";
import TotalLikes from "./TotalLikes";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, selectAllRequests } from "./requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const allRequests = useSelector(selectAllRequests);

  useEffect(() => {
   if(allRequests?.length === 0) dispatch(fetchRequests());
  }, [dispatch]);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md w-full mx-auto md:w-1/2">
      <TotalLikes count={allRequests?.length || 0} />

      {allRequests?.length > 0 ? (
        allRequests.map((request) => {
          return (
            <RequestCard
              key={request?._id}
              id={request?._id}
              firstName={request?.fromUserId?.firstName}
              lastName={request?.fromUserId?.lastName}
              age={request?.fromUserId?.age}
              photoUrl={request?.fromUserId?.photoUrl}
              about={request?.fromUserId?.about}
              gender={request?.fromUserId?.gender}
              skills={request?.fromUserId?.skills}
            />
          );
        })
      ) : (
        <li className="text-center text-pink-500 text-lg mt-10 mb-6 leading-relaxed italic">
          💌 No Request as of now
        </li>
      )}
    </ul>
  );
};

export default Requests;
