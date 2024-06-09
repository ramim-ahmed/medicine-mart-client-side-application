/* eslint-disable react/prop-types */

export default function Pagination({
  currentPage,
  handlePrevPage,
  handleNextPage,
  paginate,
  handleSelectPage,
}) {
  const pages = [...Array(paginate).keys()].map((key) => key + 1);
  return (
    <div className="flex">
      <button
        onClick={() => handlePrevPage()}
        className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md dark:bg-gray-800 ${
          currentPage === 1
            ? "cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white"
        } dark:text-gray-600 `}
      >
        <div className="flex items-center -mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-1 rtl:-scale-x-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span className="mx-1">previous</span>
        </div>
      </button>
      {pages?.map((page) => (
        <button
          onClick={() => handleSelectPage(page)}
          key={page}
          className={`hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform  rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 ${
            currentPage === page ? "bg-themeColor text-white" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === pages[pages.length - 1] ? true : false}
        onClick={() => handleNextPage()}
        className={`px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200`}
      >
        <div className="flex items-center -mx-1">
          <span className="mx-1">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-1 rtl:-scale-x-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
