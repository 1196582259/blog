import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex justify-between items-center">
      <button
        className="btn-primary"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ChevronLeft />
      </button>
      <span className="text-lg font-bold text-gray-800 dark:text-white">
        {currentPage}
      </span>
      <button
        className="btn-primary"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
