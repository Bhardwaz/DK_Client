import toast from "react-hot-toast";
import { getRelativeTime } from "./utilityfn";

export const ShowMessageToast = ({ content, firstName, lastName, photoUrl, createdAt }) => {
  const time = getRelativeTime(createdAt);

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-custom-enter" : "animate-custom-leave"
        } max-w-md w-full bg-base-100 shadow-lg rounded-xl pointer-events-auto flex border border-base-300`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 p-3">
          <img
            className="h-12 w-12 rounded-full ring ring-primary ring-offset-2"
            src={photoUrl}
            alt="connection"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 p-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-primary">
              {firstName + " " + lastName}
            </p>
            <p className="text-xs text-base-content opacity-60">{time}</p>
          </div>
          <p className="mt-1 text-sm text-base-content">{content}</p>
        </div>

        {/* Close Button */}
        <div className="flex items-center border-l border-base-300">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-ghost btn-sm rounded-none"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center", // DaisyUI-friendly position
    }
  );
};
