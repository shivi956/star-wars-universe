export const Loading = () => {
  return (
    <div
      className={`flex items-center justify-center h-56 w-screen text-slate-100`}
    >
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            fill="currentColor"
          ></path>
        </svg>
        <p className="text-3xl font-bold">Loading...</p>
      </div>
    </div>
  );
};
