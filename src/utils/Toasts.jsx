import toast from "react-hot-toast";
import { getRelativeTime } from "./utilityfn";

export const showMessageToast = ({ content, firstName, lastName, photoUrl, createdAt }) => {
  const time = getRelativeTime(createdAt);

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-base-100 shadow-lg rounded-xl pointer-events-auto flex flex-row items-start border border-base-300`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 p-3 pt-4">
          <img
            className="h-12 w-12 rounded-full ring ring-primary ring-offset-2 object-cover"
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1 py-3 pr-2 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-bold text-primary truncate">
              {firstName} {lastName}
            </p>
            <p className="text-xs text-base-content opacity-60 whitespace-nowrap">{time}</p>
          </div>
          <p className="mt-1 text-sm text-base-content line-clamp-2">{content}</p>
        </div>

        {/* Close Button */}
        <div className="flex items-stretch border-l border-base-300 flex-shrink-0">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-ghost btn-sm rounded-none rounded-r-xl h-full px-3"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      position: "top-center",
    }
  );
};