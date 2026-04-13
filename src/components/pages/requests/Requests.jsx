import { useEffect } from "react";
import RequestCard from "./RequestCard";
import TotalLikes from "./TotalLikes";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, selectAllRequests } from "./requestSlice";

export default function Requests() {
  const dispatch = useDispatch();
  const allRequests = useSelector(selectAllRequests);

  useEffect(() => {
    if (allRequests?.length === 0) dispatch(fetchRequests());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 0 24px" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="fade-up">
        <TotalLikes count={allRequests?.length || 0} />
        {allRequests?.length > 0 ? (
          allRequests.map((req) => (
            <RequestCard
              key={req?._id}
              id={req?._id}
              firstName={req?.fromUserId?.firstName}
              lastName={req?.fromUserId?.lastName}
              age={req?.fromUserId?.age}
              photoUrl={req?.fromUserId?.photoUrl}
              about={req?.fromUserId?.about}
              gender={req?.fromUserId?.gender}
              skills={req?.fromUserId?.skills}
            />
          ))
        ) : (
          <li style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-3)" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>💌</div>
            <p style={{ fontSize: "14px" }}>No requests yet</p>
          </li>
        )}
      </ul>
    </div>
  );
}
