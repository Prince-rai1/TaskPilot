import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="tf-pagination">
      <span>Showing {start}–{end} of {totalItems} issues</span>
      <div className="tf-pagination-controls">
        <button className="tf-btn-icon" style={{ padding: '4px 8px', fontSize: 13, gap: 4 }}>
          <ChevronLeft size={14} /> Previous
        </button>
        <button className="tf-btn-icon" style={{ padding: '4px 8px', fontSize: 13, backgroundColor: '#e2e8f0' }}>1</button>
        <button className="tf-btn-icon" style={{ padding: '4px 8px', fontSize: 13 }}>2</button>
        <button className="tf-btn-icon" style={{ padding: '4px 8px', fontSize: 13 }}>3</button>
        <button className="tf-btn-icon" style={{ padding: '4px 8px', fontSize: 13, gap: 4 }}>
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
