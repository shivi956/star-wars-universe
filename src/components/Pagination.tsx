type PaginationProps = {
  currentPage: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage }) => (
  <div className="flex justify-center space-x-4 mt-4">
    <button
      onClick={() => setPage(currentPage - 1)}
      disabled={currentPage <= 1}
      className={`px-4 py-2 text-white font-semibold rounded-md ${
        currentPage > 1
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'bg-gray-300 cursor-not-allowed'
      }`}
    >
      Previous
    </button>
    <button
      onClick={() => setPage(currentPage + 1)}
      className="px-4 py-2 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600 ml-4"
    >
      Next
    </button>
  </div>
);

export default Pagination;
