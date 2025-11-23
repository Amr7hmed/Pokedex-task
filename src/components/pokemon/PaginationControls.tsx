import type { PaginationControlsProps } from "@/types/pokemon";


const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
  onNext,
  onPrevious,
}: PaginationControlsProps) => {
  if (!totalPages) return null;

  const createPageNumbers = () => {
    const pages: number[] = [];
    const maxToShow = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxToShow - 1);

    if (end - start < maxToShow - 1) {
      start = Math.max(1, end - maxToShow + 1);
    }

    for (let i = start; i <= end; i += 1) pages.push(i);
    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 shadow-sm">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page === 1}
          className="rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages[0] > 1 && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className={`h-7 w-7 rounded-full text-xs ${
                page === 1
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              1
            </button>
            <span className="px-1 text-xs text-gray-400">…</span>
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`h-7 w-7 rounded-full text-xs ${
              p === page
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            <span className="px-1 text-xs text-gray-400">…</span>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={`h-7 w-7 rounded-full text-xs ${
                page === totalPages
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages}
          className="rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <p className="text-[11px] text-gray-500">
        Page {page} of {totalPages}
      </p>
    </div>
  );
};


export default PaginationControls;
