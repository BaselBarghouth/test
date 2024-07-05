import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Example({
  currentPage,
  totalPages,
  onPageChange,
  isFirstPage,
  isLastPage,
}) {
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i - 1);
    }
    return pages;
  };
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {!isFirstPage && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-yellow-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              aria-hidden="true"
              className="mr-3 h-5 w-5 text-gray-400"
            />
            Previous
          </button>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              page === currentPage
                ? "border-yellow-500 text-yellow-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {!isLastPage && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-yellow-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              aria-hidden="true"
              className="ml-3 h-5 w-5 text-gray-400"
            />
          </button>
        )}
      </div>
    </nav>
  );
}
