// components/report/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!totalPages) return null;

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex space-x-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
        >
          이전
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
        >
          다음
        </button>
      </nav>
    </div>
  );
};