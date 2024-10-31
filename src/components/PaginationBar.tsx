interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface PageButtonProps {
  page: number | string;
  currentPage: number;
  onClick: () => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center space-x-4 p-4 scale-50 md:scale-100"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="px-4 py-2 bg-gray-200 hover:bg-blue-600 rounded disabled:opacity-50"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#x25C0;
      </button>
      <button
        className="px-4 py-2 bg-gray-200 hover:bg-blue-600 rounded disabled:opacity-50"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &#x25B6;
      </button>
      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <PageButton
              page={page}
              currentPage={currentPage}
              onClick={() => onPageChange(page as number)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const PageButton: React.FC<PageButtonProps> = ({
  page,
  currentPage,
  onClick,
}) => {
  if (page === currentPage) {
    return (
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        aria-label={`Page ${page}`}
        aria-current="page"
      >
        {page}
      </button>
    );
  }
  if (page === '<' || page === '>') {
    return <span className="px-4 py-2 text-white">…</span>;
  }

  return (
    <button
      className="px-4 py-2 hover:bg-blue-600 hover:text-white bg-gray-200 rounded"
      aria-label={`Go to page ${page}`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

const getVisiblePages = (current: number, total: number) => {
  if (total <= 7) {
    return range(total);
  }
  if (current < 5) {
    return [...range(5), '>', total];
  }
  if (current > total - 4) {
    return [1, '<', ...range(5, total - 4)];
  }

  return [1, '<', current - 1, current, current + 1, '>', total];
};

const range = (count: number, start: number = 1) => {
  return Array.from(new Array(count), (_x, i) => i + start);
};

export default PaginationBar;
