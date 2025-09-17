// src/pages/profile/view.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProfile, selectProfile, selectViewId, setViewId } from "./profileSlice";
import { selectUser } from "../../auth/authSlice";

export default function ProfileView() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const profile = useSelector(selectProfile)
  const viewId = useSelector(selectViewId)
  const user = useSelector(selectUser);

  useEffect(() => {
    if(viewId === id) return
    dispatch(fetchProfile(id))
    dispatch(setViewId(id)) 
  }, [dispatch, id, viewId])

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-lg">
        <figure className="px-10 pt-10">
          <img src={user?.mainPhoto} alt="main-photo" className="rounded-full w-32 h-32 object-cover" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{profile?.firstName}, {profile?.age}</h2>
          <p className="text-sm text-base-content">{profile?.about}</p>
          <div className="mt-2">
            <p><strong>Gender:</strong> {profile?.gender}</p>
            <p><strong>Interested In:</strong> {profile?.interestIn.map(i => i)}</p>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {profile?.skills.map((skill, i) => (
              <div key={i} className="badge badge-outline">{skill}</div>
            ))}
          </div>
          <div className="card-actions mt-4">
            <Link to={`/profile/edit/${profile?._id}`} className="btn btn-primary btn-sm">Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


// AWS access portal URL: https://d-9f67650640.awsapps.com/start,
// Username: date_karle,
// One-time password: wkwnF32v#0ra5ZravEA<A&mex?pc$VbpBBw&xeZSYE1)xk%/EdtidXrs<h8

// Frontend (React)
//         ⬇
// Backend API (Node/Express)
//         ⬇
// AWS S3 (for storage) + CloudFront (CDN)
//         ⬆
// Database (Mongo)

