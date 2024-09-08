import { Link } from "react-router-dom";

function logOut() {
  localStorage.removeItem("token");
}

export const AppBar = () => {
    return (
      <div className="border-b-2 border-gray-300 py-4 sm:px-16 px-4 flex justify-between items-center">
        <div className="font-bold text-xl sm:text-2xl cursor-pointer">
          <Link to={"/blogs"}>Medium</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={"/blogs"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg sm:text-sm text-xs px-5 py-2.5 dark:bg-green-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Publish
            </button>
          </Link>
          <Link to={"/signin"}>
            <button
              onClick={logOut}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg sm:text-sm text-xs px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>
    );
  };
  
