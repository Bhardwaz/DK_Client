import { FaMapMarkerAlt, FaComments, FaLock } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

export default function UserCard({ user, onInterested, onIgnore }) { 
  return (
    <div className="card bg-base-100 shadow-lg max-w-md mx-auto w-full">
    <Carousel
     autoFocus showThumbs={false} showIndicators={true} showStatus={false}infiniteLoop emulateTouch swipeable
     className="w-full aspect-[4/3] rounded-t-lg overflow-hidden">

      <figure className="w-full h-full">
      <img
        src={user?.photoUrl}
        alt={`${user?.firstName}`}
        className="w-full h-full object-cover object-center"
      />
     </figure>
     
     <figure className="w-full h-full">
      <img
        src="https://www.behindwoods.com/hindi-actor/shahid-kapoor/shahid-kapoor-stills-photos-pictures-100.jpg"
        alt={`${user?.firstName}`}
        className="w-full h-full object-cover object-center"
      />
     </figure>

    </Carousel>

      {/* Card Body */}
      <Link to={`/profile/view/${user._id}`}>
      <div className="card-body flex flex-col justify-between">
        <div>
          <h2 className="card-title text-lg md:text-xl">
            {user?.firstName}
            <span className="ml-2 text-sm font-normal text-gray-500">
              {user?.age} • {user?.gender}
            </span>
          </h2>

          {/* Location (only if exists) */}
          {user?.location && (
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-1 text-rose-500" />
              <span>{user.location}</span>
            </div>
          )}

          <p className="mt-2 text-sm text-gray-700 line-clamp-3">
            {user?.about}
          </p>

          {user?.skills?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="badge badge-outline px-3 py-1 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onInterested}
            className="btn flex-1 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white shadow-md rounded-2xl"
          >
            ❤️ Interested
          </button>
          <button
            onClick={onIgnore}
            className="btn flex-1 bg-white border border-gray-300 text-neutral rounded-2xl"
          >
            ❌ Ignore
          </button>
          <button
            className="btn flex-1 bg-blue-500 text-white rounded-2xl shadow-md"
          >
            <FaLock className="text-lg" />
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
}
